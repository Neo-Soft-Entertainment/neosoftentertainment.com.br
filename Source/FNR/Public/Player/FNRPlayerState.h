// Copyright Neo-Soft Entertainment. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/PlayerState.h"
#include "AbilitySystemInterface.h"
#include "FNRPlayerState.generated.h"

class UFNRVitalsComponent;
class UAbilitySystemComponent;

// Delegate for team changes
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnTeamChanged, int32, NewTeamId);

// Delegate for character changes
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnCharacterChanged, FName, NewCharacterId);

/**
 * Custom PlayerState for the FNR project.
 * Handles TeamId, CharacterId replication, and provides a facade for reading vitals.
 * Implements IAbilitySystemInterface if GAS is used on PlayerState.
 */
UCLASS()
class FNR_API AFNRPlayerState : public APlayerState, public IAbilitySystemInterface
{
	GENERATED_BODY()

public:
	AFNRPlayerState();

	virtual void GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const override;

	// ---------------------------
	// IAbilitySystemInterface
	// ---------------------------
	virtual UAbilitySystemComponent* GetAbilitySystemComponent() const override;

	// ---------------------------
	// Team ID
	// ---------------------------
	
	/** Get the current team ID */
	UFUNCTION(BlueprintCallable, Category = "FNR|Team")
	int32 GetTeamId() const { return TeamId; }

	/** Set team ID (server only) */
	UFUNCTION(BlueprintCallable, BlueprintAuthorityOnly, Category = "FNR|Team")
	void SetTeamId(int32 NewTeamId);

	/** Delegate broadcast when TeamId changes (on all clients) */
	UPROPERTY(BlueprintAssignable, Category = "FNR|Team")
	FOnTeamChanged OnTeamChanged;

	// ---------------------------
	// Character ID (boneco)
	// ---------------------------

	/** Get the selected character identifier */
	UFUNCTION(BlueprintCallable, Category = "FNR|Character")
	FName GetCharacterId() const { return CharacterId; }

	/** Set character ID (server only) */
	UFUNCTION(BlueprintCallable, BlueprintAuthorityOnly, Category = "FNR|Character")
	void SetCharacterId(FName NewCharacterId);

	/** Delegate broadcast when CharacterId changes (on all clients) */
	UPROPERTY(BlueprintAssignable, Category = "FNR|Character")
	FOnCharacterChanged OnCharacterChanged;

	// ---------------------------
	// Vitals Facade (reads from VitalsComponent or GAS)
	// ---------------------------

	/** Get current Health */
	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetHealth() const;

	/** Get max Health */
	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetHealthMax() const;

	/** Get current Shield */
	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetShield() const;

	/** Get max Shield */
	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetShieldMax() const;

	/** Get current Impeto */
	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetImpeto() const;

	/** Get max Impeto */
	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	float GetImpetoMax() const;

	/** Get the vitals component */
	UFUNCTION(BlueprintCallable, Category = "FNR|Vitals")
	UFNRVitalsComponent* GetVitalsComponent() const { return VitalsComponent; }

protected:
	// ---------------------------
	// Replicated Properties
	// ---------------------------

	/** Team ID - replicated with OnRep */
	UPROPERTY(ReplicatedUsing = OnRep_TeamId, BlueprintReadOnly, Category = "FNR|Team")
	int32 TeamId;

	/** Character/Boneco ID - replicated with OnRep */
	UPROPERTY(ReplicatedUsing = OnRep_CharacterId, BlueprintReadOnly, Category = "FNR|Character")
	FName CharacterId;

	// ---------------------------
	// Components
	// ---------------------------

	/** Vitals component that handles attribute caching and delegates */
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "FNR|Vitals")
	TObjectPtr<UFNRVitalsComponent> VitalsComponent;

	/**
	 * Ability System Component - if using GAS on PlayerState.
	 * If GAS is on Pawn, this can be null and VitalsComponent will read from Pawn's ASC.
	 */
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "FNR|Abilities")
	TObjectPtr<UAbilitySystemComponent> AbilitySystemComponent;

	// ---------------------------
	// OnRep Functions
	// ---------------------------

	UFUNCTION()
	void OnRep_TeamId(int32 OldTeamId);

	UFUNCTION()
	void OnRep_CharacterId(FName OldCharacterId);
};
