// Copyright Neo-Soft Entertainment. All Rights Reserved.

#include "UI/TeamStatusPanelWidget.h"
#include "UI/TeamMemberStatusEntryWidget.h"
#include "Player/FNRPlayerState.h"
#include "Data/FNRCharacterDataAsset.h"
#include "GameFramework/GameStateBase.h"
#include "GameFramework/PlayerController.h"
#include "Components/PanelWidget.h"
#include "Kismet/GameplayStatics.h"

UTeamStatusPanelWidget::UTeamStatusPanelWidget(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
	bIncludeSelf = true;
	bIsRefreshing = false;
}

void UTeamStatusPanelWidget::NativeOnInitialized()
{
	Super::NativeOnInitialized();
	
	// Early validation
	if (!EntryClass)
	{
		UE_LOG(LogTemp, Warning, TEXT("UTeamStatusPanelWidget: EntryClass is not set!"));
	}
}

void UTeamStatusPanelWidget::NativeConstruct()
{
	Super::NativeConstruct();
	
	// Bind to events
	BindToEvents();
	
	// Initial population of team members
	RefreshTeamMembers();
}

void UTeamStatusPanelWidget::NativeDestruct()
{
	// Clean up events and entries
	UnbindFromEvents();
	ClearAllEntries();
	
	Super::NativeDestruct();
}

void UTeamStatusPanelWidget::BindToEvents()
{
	// Get and cache the owning player's PlayerState
	AFNRPlayerState* OwningPS = GetOwningFNRPlayerState();
	if (!OwningPS)
	{
		UE_LOG(LogTemp, Warning, TEXT("UTeamStatusPanelWidget: Could not get owning FNRPlayerState"));
		return;
	}
	
	// Unbind from old if different
	if (CachedOwningPS.IsValid() && CachedOwningPS.Get() != OwningPS)
	{
		CachedOwningPS->OnTeamChanged.RemoveDynamic(this, &UTeamStatusPanelWidget::OnOwningTeamChanged);
	}
	
	CachedOwningPS = OwningPS;
	
	// Bind to team change
	OwningPS->OnTeamChanged.AddDynamic(this, &UTeamStatusPanelWidget::OnOwningTeamChanged);
	
	// Note: For player join/leave events, you would bind to GameState events here.
	// The exact implementation depends on your GameState class.
	// Example:
	// if (AYourGameState* GS = GetWorld()->GetGameState<AYourGameState>())
	// {
	//     GS->OnPlayerJoined.AddDynamic(this, &UTeamStatusPanelWidget::OnPlayerJoinedGame);
	//     GS->OnPlayerLeft.AddDynamic(this, &UTeamStatusPanelWidget::OnPlayerLeftGame);
	// }
	//
	// Alternatively, you can set up a timer to periodically check for changes,
	// or use PlayerController events. The cleanest approach is custom GameState delegates.
}

void UTeamStatusPanelWidget::UnbindFromEvents()
{
	// Unbind from owning player's team change
	if (CachedOwningPS.IsValid())
	{
		CachedOwningPS->OnTeamChanged.RemoveDynamic(this, &UTeamStatusPanelWidget::OnOwningTeamChanged);
		CachedOwningPS.Reset();
	}
	
	// Unbind from GameState events if you added them
	// Example:
	// if (AYourGameState* GS = GetWorld()->GetGameState<AYourGameState>())
	// {
	//     GS->OnPlayerJoined.RemoveDynamic(this, &UTeamStatusPanelWidget::OnPlayerJoinedGame);
	//     GS->OnPlayerLeft.RemoveDynamic(this, &UTeamStatusPanelWidget::OnPlayerLeftGame);
	// }
}

void UTeamStatusPanelWidget::OnOwningTeamChanged(int32 NewTeamId)
{
	// Owning player changed teams - full rebuild
	RefreshTeamMembers();
}

AFNRPlayerState* UTeamStatusPanelWidget::GetOwningFNRPlayerState() const
{
	if (APlayerController* PC = GetOwningPlayer())
	{
		return Cast<AFNRPlayerState>(PC->PlayerState);
	}
	return nullptr;
}

int32 UTeamStatusPanelWidget::GetOwningTeamId() const
{
	if (AFNRPlayerState* OwningPS = GetOwningFNRPlayerState())
	{
		return OwningPS->GetTeamId();
	}
	return INDEX_NONE;
}

int32 UTeamStatusPanelWidget::GetTeamMemberCount() const
{
	return Entries.Num();
}

void UTeamStatusPanelWidget::RefreshTeamMembers()
{
	// Prevent re-entry
	if (bIsRefreshing)
	{
		return;
	}
	bIsRefreshing = true;
	
	// Get the owning player's team ID
	const int32 OwningTeamId = GetOwningTeamId();
	AFNRPlayerState* OwningPS = GetOwningFNRPlayerState();
	
	// Get all players from GameState
	UWorld* World = GetWorld();
	if (!World)
	{
		bIsRefreshing = false;
		return;
	}
	
	AGameStateBase* GS = World->GetGameState<AGameStateBase>();
	if (!GS)
	{
		bIsRefreshing = false;
		return;
	}
	
	// Build set of valid team members
	TSet<APlayerState*> ValidTeamMembers;
	
	for (APlayerState* PS : GS->PlayerArray)
	{
		if (!PS)
		{
			continue;
		}
		
		// Cast to FNRPlayerState to check team
		AFNRPlayerState* FNRPS = Cast<AFNRPlayerState>(PS);
		if (!FNRPS)
		{
			continue;
		}
		
		// Check if same team
		if (FNRPS->GetTeamId() != OwningTeamId)
		{
			continue;
		}
		
		// Check if self and we're excluding self
		if (!bIncludeSelf && FNRPS == OwningPS)
		{
			continue;
		}
		
		// Valid team member
		ValidTeamMembers.Add(PS);
	}
	
	// Ensure entries for all valid team members
	for (APlayerState* PS : ValidTeamMembers)
	{
		EnsureEntry(PS);
	}
	
	// Remove stale entries
	CleanupStaleEntries(ValidTeamMembers);
	
	// Broadcast refresh event
	OnTeamListRefreshed.Broadcast();
	
	bIsRefreshing = false;
}

UTeamMemberStatusEntryWidget* UTeamStatusPanelWidget::EnsureEntry(APlayerState* PS)
{
	if (!PS || !MembersContainer || !EntryClass)
	{
		return nullptr;
	}
	
	// Check if entry already exists
	TWeakObjectPtr<APlayerState> WeakPS(PS);
	if (UTeamMemberStatusEntryWidget** ExistingEntry = Entries.Find(WeakPS))
	{
		if (*ExistingEntry && (*ExistingEntry)->IsValidLowLevel())
		{
			return *ExistingEntry;
		}
	}
	
	// Create new entry widget
	UTeamMemberStatusEntryWidget* NewEntry = CreateWidget<UTeamMemberStatusEntryWidget>(GetOwningPlayer(), EntryClass);
	if (!NewEntry)
	{
		UE_LOG(LogTemp, Warning, TEXT("UTeamStatusPanelWidget: Failed to create entry widget"));
		return nullptr;
	}
	
	// Configure entry
	NewEntry->CharacterDataAsset = CharacterDataAsset;
	NewEntry->SetObservedPlayerState(PS);
	
	// Add to container
	MembersContainer->AddChild(NewEntry);
	
	// Store in map
	Entries.Add(WeakPS, NewEntry);
	
	return NewEntry;
}

void UTeamStatusPanelWidget::RemoveEntry(APlayerState* PS)
{
	if (!PS)
	{
		return;
	}
	
	TWeakObjectPtr<APlayerState> WeakPS(PS);
	
	if (TObjectPtr<UTeamMemberStatusEntryWidget>* Entry = Entries.Find(WeakPS))
	{
		if (*Entry)
		{
			// Clear observed state (this will unbind delegates)
			(*Entry)->SetObservedPlayerState(nullptr);
			
			// Remove from parent
			if (MembersContainer)
			{
				MembersContainer->RemoveChild(*Entry);
			}
			
			// Remove from viewport
			(*Entry)->RemoveFromParent();
		}
		
		Entries.Remove(WeakPS);
	}
}

void UTeamStatusPanelWidget::ClearAllEntries()
{
	// Collect all keys first to avoid modifying map while iterating
	TArray<TWeakObjectPtr<APlayerState>> Keys;
	Entries.GetKeys(Keys);
	
	for (const TWeakObjectPtr<APlayerState>& Key : Keys)
	{
		if (TObjectPtr<UTeamMemberStatusEntryWidget>* Entry = Entries.Find(Key))
		{
			if (*Entry)
			{
				(*Entry)->SetObservedPlayerState(nullptr);
				(*Entry)->RemoveFromParent();
			}
		}
	}
	
	Entries.Empty();
}

void UTeamStatusPanelWidget::CleanupStaleEntries(const TSet<APlayerState*>& ValidTeamMembers)
{
	// Find entries to remove
	TArray<APlayerState*> EntriesToRemove;
	
	for (auto& Pair : Entries)
	{
		APlayerState* PS = Pair.Key.Get();
		
		// Remove if:
		// - PlayerState is null (disconnected)
		// - PlayerState is no longer in valid set (changed team or left)
		// - Widget is invalid
		if (!PS || !ValidTeamMembers.Contains(PS) || !Pair.Value)
		{
			EntriesToRemove.Add(PS);
		}
	}
	
	// Remove stale entries
	for (APlayerState* PS : EntriesToRemove)
	{
		if (PS)
		{
			RemoveEntry(PS);
		}
		else
		{
			// Handle null key case - find and remove
			TWeakObjectPtr<APlayerState> NullKey;
			for (auto& Pair : Entries)
			{
				if (!Pair.Key.IsValid())
				{
					NullKey = Pair.Key;
					break;
				}
			}
			
			if (TObjectPtr<UTeamMemberStatusEntryWidget>* Entry = Entries.Find(NullKey))
			{
				if (*Entry)
				{
					(*Entry)->SetObservedPlayerState(nullptr);
					(*Entry)->RemoveFromParent();
				}
			}
			Entries.Remove(NullKey);
		}
	}
}
