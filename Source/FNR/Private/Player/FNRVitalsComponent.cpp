// Copyright Neo-Soft Entertainment. All Rights Reserved.

#include "Player/FNRVitalsComponent.h"
#include "AbilitySystemComponent.h"

// ============================================================================
// HOW TO INTEGRATE WITH YOUR ATTRIBUTESET:
// ============================================================================
// 
// 1. Include your AttributeSet header here:
//    #include "Abilities/FNRAttributeSet.h"
//
// 2. In InitializeWithAbilitySystem(), bind to your specific attributes:
//    ASC->GetGameplayAttributeValueChangeDelegate(UFNRAttributeSet::GetHealthAttribute())
//        .AddUObject(this, &UFNRVitalsComponent::HandleHealthChanged);
//
// 3. Make sure your AttributeSet has these attributes defined:
//    UPROPERTY(BlueprintReadOnly, ReplicatedUsing=OnRep_Health) FGameplayAttributeData Health;
//    UPROPERTY(BlueprintReadOnly, ReplicatedUsing=OnRep_MaxHealth) FGameplayAttributeData MaxHealth;
//    (same for Shield, MaxShield, Impeto, MaxImpeto)
//
// ============================================================================

UFNRVitalsComponent::UFNRVitalsComponent()
{
	// No tick needed - updates via events only
	PrimaryComponentTick.bCanEverTick = false;
	
	// Initialize cached values with safe defaults
	Health = 100.0f;
	HealthMax = 100.0f;
	Shield = 0.0f;
	ShieldMax = 100.0f;
	Impeto = 0.0f;
	ImpetoMax = 100.0f;
}

void UFNRVitalsComponent::BeginPlay()
{
	Super::BeginPlay();
	
	// If the owning actor has an ASC, try to initialize automatically
	// This can be done here or manually called from PlayerState
	if (AActor* Owner = GetOwner())
	{
		if (IAbilitySystemInterface* ASI = Cast<IAbilitySystemInterface>(Owner))
		{
			if (UAbilitySystemComponent* ASC = ASI->GetAbilitySystemComponent())
			{
				InitializeWithAbilitySystem(ASC);
			}
		}
	}
}

void UFNRVitalsComponent::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	UninitializeFromAbilitySystem();
	Super::EndPlay(EndPlayReason);
}

void UFNRVitalsComponent::InitializeWithAbilitySystem(UAbilitySystemComponent* ASC)
{
	if (!ASC)
	{
		return;
	}

	// If already bound to a different ASC, clean up first
	if (BoundASC.IsValid() && BoundASC.Get() != ASC)
	{
		UninitializeFromAbilitySystem();
	}

	BoundASC = ASC;

	// ============================================================================
	// IMPORTANT: Replace these placeholder attribute bindings with your actual AttributeSet!
	// ============================================================================
	//
	// Example with a real AttributeSet:
	// 
	// #include "Abilities/FNRAttributeSet.h"
	//
	// HealthChangedDelegateHandle = ASC->GetGameplayAttributeValueChangeDelegate(
	//     UFNRAttributeSet::GetHealthAttribute()).AddUObject(this, &UFNRVitalsComponent::HandleHealthChanged);
	//
	// HealthMaxChangedDelegateHandle = ASC->GetGameplayAttributeValueChangeDelegate(
	//     UFNRAttributeSet::GetMaxHealthAttribute()).AddUObject(this, &UFNRVitalsComponent::HandleHealthMaxChanged);
	//
	// (Repeat for Shield, MaxShield, Impeto, MaxImpeto)
	//
	// Then read initial values:
	// bool bFound = false;
	// Health = ASC->GetGameplayAttributeValue(UFNRAttributeSet::GetHealthAttribute(), bFound);
	// if (!bFound) Health = 100.0f;
	// ...
	//
	// ============================================================================

	// For now, just broadcast initial state
	BroadcastVitalsChanged();
}

void UFNRVitalsComponent::UninitializeFromAbilitySystem()
{
	if (!BoundASC.IsValid())
	{
		return;
	}

	UAbilitySystemComponent* ASC = BoundASC.Get();

	// Remove all delegate bindings
	// ============================================================================
	// When using real attributes, unbind like this:
	//
	// if (HealthChangedDelegateHandle.IsValid())
	// {
	//     ASC->GetGameplayAttributeValueChangeDelegate(UFNRAttributeSet::GetHealthAttribute())
	//         .Remove(HealthChangedDelegateHandle);
	//     HealthChangedDelegateHandle.Reset();
	// }
	// (Repeat for all attributes)
	// ============================================================================

	BoundASC.Reset();
}

void UFNRVitalsComponent::SetHealth(float NewHealth, float NewHealthMax)
{
	const bool bChanged = (Health != NewHealth) || (HealthMax != NewHealthMax);
	
	Health = NewHealth;
	HealthMax = FMath::Max(NewHealthMax, 1.0f); // Prevent division by zero
	
	if (bChanged)
	{
		BroadcastVitalsChanged();
	}
}

void UFNRVitalsComponent::SetShield(float NewShield, float NewShieldMax)
{
	const bool bChanged = (Shield != NewShield) || (ShieldMax != NewShieldMax);
	
	Shield = NewShield;
	ShieldMax = FMath::Max(NewShieldMax, 1.0f); // Prevent division by zero
	
	if (bChanged)
	{
		BroadcastVitalsChanged();
	}
}

void UFNRVitalsComponent::SetImpeto(float NewImpeto, float NewImpetoMax)
{
	const bool bChanged = (Impeto != NewImpeto) || (ImpetoMax != NewImpetoMax);
	
	Impeto = NewImpeto;
	ImpetoMax = FMath::Max(NewImpetoMax, 1.0f); // Prevent division by zero
	
	if (bChanged)
	{
		BroadcastVitalsChanged();
	}
}

void UFNRVitalsComponent::HandleHealthChanged(const FOnAttributeChangeData& ChangeData)
{
	Health = ChangeData.NewValue;
	BroadcastVitalsChanged();
}

void UFNRVitalsComponent::HandleHealthMaxChanged(const FOnAttributeChangeData& ChangeData)
{
	HealthMax = FMath::Max(ChangeData.NewValue, 1.0f);
	BroadcastVitalsChanged();
}

void UFNRVitalsComponent::HandleShieldChanged(const FOnAttributeChangeData& ChangeData)
{
	Shield = ChangeData.NewValue;
	BroadcastVitalsChanged();
}

void UFNRVitalsComponent::HandleShieldMaxChanged(const FOnAttributeChangeData& ChangeData)
{
	ShieldMax = FMath::Max(ChangeData.NewValue, 1.0f);
	BroadcastVitalsChanged();
}

void UFNRVitalsComponent::HandleImpetoChanged(const FOnAttributeChangeData& ChangeData)
{
	Impeto = ChangeData.NewValue;
	BroadcastVitalsChanged();
}

void UFNRVitalsComponent::HandleImpetoMaxChanged(const FOnAttributeChangeData& ChangeData)
{
	ImpetoMax = FMath::Max(ChangeData.NewValue, 1.0f);
	BroadcastVitalsChanged();
}

void UFNRVitalsComponent::BroadcastVitalsChanged()
{
	OnVitalsChanged.Broadcast();
}
