// Copyright Neo-Soft Entertainment. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "GameplayEffectTypes.h"
#include "FNRVitalsComponent.generated.h"

class UAbilitySystemComponent;

/**
 * Delegate broadcast when any vital value changes.
 * UI should bind to this and call RefreshFromObserved().
 */
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnVitalsChanged);

/**
 * Component that caches vital attributes (Health, Shield, Impeto) and broadcasts changes.
 * Acts as a facade between GAS (or raw replicated values) and UI.
 * 
 * SETUP:
 * - If using GAS: Call InitializeWithAbilitySystem() after the ASC is ready.
 * - If not using GAS: Manually call SetHealth/SetShield/SetImpeto when values change (e.g., in OnRep).
 */
UCLASS(ClassGroup = (Custom), meta = (BlueprintSpawnableComponent))
class FNR_API UFNRVitalsComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	UFNRVitalsComponent();

	// ---------------------------
	// Initialization
	// ---------------------------

	/**
	 * Initialize with an AbilitySystemComponent to automatically bind to attribute changes.
	 * Call this after the ASC is valid and attributes are initialized.
	 * 
	 * @param ASC The AbilitySystemComponent to bind to
	 */
	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	void InitializeWithAbilitySystem(UAbilitySystemComponent* ASC);

	/** Cleanup ASC bindings */
	void UninitializeFromAbilitySystem();

	// ---------------------------
	// Getters
	// ---------------------------

	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetHealth() const { return Health; }

	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetHealthMax() const { return HealthMax; }

	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetShield() const { return Shield; }

	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetShieldMax() const { return ShieldMax; }

	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetImpeto() const { return Impeto; }

	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetImpetoMax() const { return ImpetoMax; }

	// ---------------------------
	// Manual Setters (for non-GAS usage or testing)
	// ---------------------------

	/** Set health values and broadcast change */
	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	void SetHealth(float NewHealth, float NewHealthMax);

	/** Set shield values and broadcast change */
	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	void SetShield(float NewShield, float NewShieldMax);

	/** Set impeto values and broadcast change */
	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	void SetImpeto(float NewImpeto, float NewImpetoMax);

	// ---------------------------
	// Delegates
	// ---------------------------

	/**
	 * Broadcast when any vital value changes.
	 * UI widgets should bind to this to update their display.
	 */
	UPROPERTY(BlueprintAssignable, Category = "FNR|Vitals")
	FOnVitalsChanged OnVitalsChanged;

protected:
	virtual void BeginPlay() override;
	virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;

	// ---------------------------
	// GAS Attribute Callbacks
	// ---------------------------

	/**
	 * Called when a gameplay attribute changes.
	 * Updates the cached value and broadcasts OnVitalsChanged.
	 * 
	 * HOW TO CONNECT YOUR ATTRIBUTES:
	 * In your AttributeSet (e.g., UFNRAttributeSet), define:
	 * - Health, MaxHealth (or HealthMax)
	 * - Shield, MaxShield (or ShieldMax)  
	 * - Impeto, MaxImpeto (or ImpetoMax)
	 * 
	 * Then in InitializeWithAbilitySystem(), we bind to these using:
	 * ASC->GetGameplayAttributeValueChangeDelegate(Attribute).AddUObject(...)
	 */
	void HandleHealthChanged(const FOnAttributeChangeData& ChangeData);
	void HandleHealthMaxChanged(const FOnAttributeChangeData& ChangeData);
	void HandleShieldChanged(const FOnAttributeChangeData& ChangeData);
	void HandleShieldMaxChanged(const FOnAttributeChangeData& ChangeData);
	void HandleImpetoChanged(const FOnAttributeChangeData& ChangeData);
	void HandleImpetoMaxChanged(const FOnAttributeChangeData& ChangeData);

	/** Broadcasts OnVitalsChanged delegate */
	void BroadcastVitalsChanged();

private:
	// ---------------------------
	// Cached Vital Values
	// ---------------------------

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "FNR|Vitals", meta = (AllowPrivateAccess = "true"))
	float Health;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "FNR|Vitals", meta = (AllowPrivateAccess = "true"))
	float HealthMax;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "FNR|Vitals", meta = (AllowPrivateAccess = "true"))
	float Shield;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "FNR|Vitals", meta = (AllowPrivateAccess = "true"))
	float ShieldMax;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "FNR|Vitals", meta = (AllowPrivateAccess = "true"))
	float Impeto;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "FNR|Vitals", meta = (AllowPrivateAccess = "true"))
	float ImpetoMax;

	// ---------------------------
	// ASC Reference
	// ---------------------------

	/** Weak pointer to the ASC we're bound to */
	TWeakObjectPtr<UAbilitySystemComponent> BoundASC;

	/** Delegate handles for unbinding */
	FDelegateHandle HealthChangedDelegateHandle;
	FDelegateHandle HealthMaxChangedDelegateHandle;
	FDelegateHandle ShieldChangedDelegateHandle;
	FDelegateHandle ShieldMaxChangedDelegateHandle;
	FDelegateHandle ImpetoChangedDelegateHandle;
	FDelegateHandle ImpetoMaxChangedDelegateHandle;
};
