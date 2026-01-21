// Copyright Neo-Soft Entertainment. All Rights Reserved.

#include "UI/TeamMemberStatusEntryWidget.h"
#include "Player/FNRPlayerState.h"
#include "Player/FNRVitalsComponent.h"
#include "Data/FNRCharacterDataAsset.h"
#include "Components/ProgressBar.h"
#include "Components/TextBlock.h"
#include "Components/Image.h"
#include "Engine/Texture2D.h"

UTeamMemberStatusEntryWidget::UTeamMemberStatusEntryWidget(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
	CachedCharacterId = NAME_None;
}

void UTeamMemberStatusEntryWidget::NativeOnInitialized()
{
	Super::NativeOnInitialized();
	
	// Initial state - widgets are initialized but no PlayerState yet
}

void UTeamMemberStatusEntryWidget::NativeDestruct()
{
	// Clean up delegate bindings to avoid crashes
	UnbindFromObserved();
	
	Super::NativeDestruct();
}

void UTeamMemberStatusEntryWidget::SetObservedPlayerState(APlayerState* PS)
{
	AFNRPlayerState* FNRPS = Cast<AFNRPlayerState>(PS);
	
	// If same as current, do nothing
	if (ObservedPS.Get() == FNRPS)
	{
		return;
	}
	
	// Unbind from old
	UnbindFromObserved();
	
	// Bind to new
	if (FNRPS)
	{
		BindToObserved(FNRPS);
	}
	else
	{
		ObservedPS.Reset();
	}
	
	// Initial refresh
	RefreshFromObserved();
}

APlayerState* UTeamMemberStatusEntryWidget::GetObservedPlayerState() const
{
	return ObservedPS.Get();
}

void UTeamMemberStatusEntryWidget::RefreshFromObserved()
{
	AFNRPlayerState* PS = ObservedPS.Get();
	
	if (!PS)
	{
		// No PlayerState - set to default/empty state
		if (HealthBar)
		{
			HealthBar->SetPercent(0.0f);
		}
		if (ShieldBar)
		{
			ShieldBar->SetPercent(0.0f);
		}
		if (ImpetoBar)
		{
			ImpetoBar->SetPercent(0.0f);
		}
		if (PlayerNameText)
		{
			PlayerNameText->SetText(FText::FromString(TEXT("---")));
		}
		return;
	}
	
	// Update Health bar
	if (HealthBar)
	{
		const float HealthPercent = CalculateProgress(PS->GetHealth(), PS->GetHealthMax());
		HealthBar->SetPercent(HealthPercent);
	}
	
	// Update Health text (optional)
	if (HealthText)
	{
		const FString HealthStr = FString::Printf(TEXT("%.0f/%.0f"), PS->GetHealth(), PS->GetHealthMax());
		HealthText->SetText(FText::FromString(HealthStr));
	}
	
	// Update Shield bar
	if (ShieldBar)
	{
		const float ShieldPercent = CalculateProgress(PS->GetShield(), PS->GetShieldMax());
		ShieldBar->SetPercent(ShieldPercent);
	}
	
	// Update Shield text (optional)
	if (ShieldText)
	{
		const FString ShieldStr = FString::Printf(TEXT("%.0f/%.0f"), PS->GetShield(), PS->GetShieldMax());
		ShieldText->SetText(FText::FromString(ShieldStr));
	}
	
	// Update Impeto bar
	if (ImpetoBar)
	{
		const float ImpetoPercent = CalculateProgress(PS->GetImpeto(), PS->GetImpetoMax());
		ImpetoBar->SetPercent(ImpetoPercent);
	}
	
	// Update Impeto text (optional)
	if (ImpetoText)
	{
		const FString ImpetoStr = FString::Printf(TEXT("%.0f/%.0f"), PS->GetImpeto(), PS->GetImpetoMax());
		ImpetoText->SetText(FText::FromString(ImpetoStr));
	}
	
	// Update Player Name
	if (PlayerNameText)
	{
		PlayerNameText->SetText(FText::FromString(PS->GetPlayerName()));
	}
	
	// Update Character Icon if changed
	const FName CurrentCharacterId = PS->GetCharacterId();
	if (CurrentCharacterId != CachedCharacterId)
	{
		CachedCharacterId = CurrentCharacterId;
		UpdateCharacterIcon(CurrentCharacterId);
	}
	
	// Broadcast update event for Blueprint animations
	OnEntryUpdated.Broadcast();
}

void UTeamMemberStatusEntryWidget::UnbindFromObserved()
{
	AFNRPlayerState* PS = ObservedPS.Get();
	
	if (!PS)
	{
		return;
	}
	
	// Unbind from vitals
	if (UFNRVitalsComponent* VitalsComp = PS->GetVitalsComponent())
	{
		VitalsComp->OnVitalsChanged.RemoveDynamic(this, &UTeamMemberStatusEntryWidget::OnObservedVitalsChanged);
	}
	
	// Unbind from character changed
	PS->OnCharacterChanged.RemoveDynamic(this, &UTeamMemberStatusEntryWidget::OnObservedCharacterChanged);
	
	// Unbind from team changed (in case we want to react to it)
	PS->OnTeamChanged.RemoveDynamic(this, &UTeamMemberStatusEntryWidget::OnObservedTeamChanged);
	
	ObservedPS.Reset();
}

void UTeamMemberStatusEntryWidget::BindToObserved(AFNRPlayerState* PS)
{
	if (!PS)
	{
		return;
	}
	
	ObservedPS = PS;
	
	// Bind to vitals
	if (UFNRVitalsComponent* VitalsComp = PS->GetVitalsComponent())
	{
		VitalsComp->OnVitalsChanged.AddDynamic(this, &UTeamMemberStatusEntryWidget::OnObservedVitalsChanged);
	}
	
	// Bind to character changed
	PS->OnCharacterChanged.AddDynamic(this, &UTeamMemberStatusEntryWidget::OnObservedCharacterChanged);
	
	// Bind to team changed
	PS->OnTeamChanged.AddDynamic(this, &UTeamMemberStatusEntryWidget::OnObservedTeamChanged);
}

void UTeamMemberStatusEntryWidget::OnObservedVitalsChanged()
{
	// Vitals changed - refresh UI
	RefreshFromObserved();
}

void UTeamMemberStatusEntryWidget::OnObservedCharacterChanged(FName NewCharacterId)
{
	// Character changed - update icon
	if (NewCharacterId != CachedCharacterId)
	{
		CachedCharacterId = NewCharacterId;
		UpdateCharacterIcon(NewCharacterId);
		
		// Broadcast for Blueprint animations
		OnCharacterIconChanged.Broadcast();
	}
}

void UTeamMemberStatusEntryWidget::OnObservedTeamChanged(int32 NewTeamId)
{
	// Team changed - the parent TeamStatusPanelWidget will handle rebuilding the list
	// This entry might be removed if the observed player left the team
	// No action needed here, but we keep the handler in case Blueprint wants to animate
}

void UTeamMemberStatusEntryWidget::UpdateCharacterIcon(FName CharacterId)
{
	if (!CharacterIcon)
	{
		return;
	}
	
	// Look up character data from the data asset
	if (!CharacterDataAsset)
	{
		// No data asset configured - can't show icon
		CharacterIcon->SetBrushFromTexture(nullptr);
		return;
	}
	
	FFNRCharacterData CharData;
	if (CharacterDataAsset->FindCharacterData(CharacterId, CharData))
	{
		// Load the icon (using soft pointer - may need to async load in production)
		if (UTexture2D* IconTexture = CharData.Icon.LoadSynchronous())
		{
			CharacterIcon->SetBrushFromTexture(IconTexture);
		}
		else
		{
			CharacterIcon->SetBrushFromTexture(nullptr);
		}
	}
	else
	{
		// Character not found - clear icon
		CharacterIcon->SetBrushFromTexture(nullptr);
	}
}

float UTeamMemberStatusEntryWidget::CalculateProgress(float Current, float Max)
{
	// Prevent division by zero
	if (Max <= 0.0f)
	{
		return 0.0f;
	}
	
	// Clamp to 0-1 range
	return FMath::Clamp(Current / Max, 0.0f, 1.0f);
}
