// Copyright Neo-Soft Entertainment. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "TeamMemberStatusEntryWidget.generated.h"

class APlayerState;
class AFNRPlayerState;
class UProgressBar;
class UTextBlock;
class UImage;
class UFNRCharacterDataAsset;

/**
 * Delegate broadcast when the entry widget updates.
 * Blueprint can bind to this for animations.
 */
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnEntryUpdated);

/**
 * Delegate broadcast when the character icon changes.
 * Blueprint can bind to this for animations.
 */
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnCharacterIconChanged);

/**
 * Widget that displays the status of a single team member.
 * Shows Health, Shield, Impeto bars and the character icon.
 * 
 * USAGE:
 * 1. Create a UMG widget blueprint that inherits from this class
 * 2. Add ProgressBars with names: HealthBar, ShieldBar, ImpetoBar (bind in Designer)
 * 3. Add Image with name: CharacterIcon (bind in Designer)
 * 4. Add TextBlock with name: PlayerNameText (optional, bind in Designer)
 * 5. The TeamStatusPanelWidget will create and manage these entries
 * 
 * BINDING:
 * In your Blueprint widget, mark these as BindWidget:
 * - HealthBar (UProgressBar)
 * - ShieldBar (UProgressBar)  
 * - ImpetoBar (UProgressBar)
 * - CharacterIcon (UImage)
 * - PlayerNameText (UTextBlock, optional)
 */
UCLASS(Blueprintable, BlueprintType)
class FNR_API UTeamMemberStatusEntryWidget : public UUserWidget
{
	GENERATED_BODY()

public:
	UTeamMemberStatusEntryWidget(const FObjectInitializer& ObjectInitializer);

	// ---------------------------
	// Public API
	// ---------------------------

	/**
	 * Set the PlayerState to observe.
	 * This will bind to the PS's vitals and character change delegates.
	 * @param PS The PlayerState to observe (should be AFNRPlayerState)
	 */
	UFUNCTION(BlueprintCallable, Category = "FNR|TeamStatus")
	void SetObservedPlayerState(APlayerState* PS);

	/**
	 * Get the currently observed PlayerState.
	 */
	UFUNCTION(BlueprintCallable, Category = "FNR|TeamStatus")
	APlayerState* GetObservedPlayerState() const;

	/**
	 * Manually refresh the UI from the observed PlayerState.
	 * Normally called automatically via delegates.
	 */
	UFUNCTION(BlueprintCallable, Category = "FNR|TeamStatus")
	void RefreshFromObserved();

	// ---------------------------
	// Configuration
	// ---------------------------

	/** Data asset for looking up character icons by CharacterId */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "FNR|TeamStatus")
	TObjectPtr<UFNRCharacterDataAsset> CharacterDataAsset;

	// ---------------------------
	// Blueprint Events
	// ---------------------------

	/** Broadcast when the entry is updated (vitals changed) */
	UPROPERTY(BlueprintAssignable, Category = "FNR|TeamStatus|Events")
	FOnEntryUpdated OnEntryUpdated;

	/** Broadcast when the character icon changes */
	UPROPERTY(BlueprintAssignable, Category = "FNR|TeamStatus|Events")
	FOnCharacterIconChanged OnCharacterIconChanged;

protected:
	// ---------------------------
	// UUserWidget Overrides
	// ---------------------------

	virtual void NativeOnInitialized() override;
	virtual void NativeDestruct() override;

	// ---------------------------
	// Bound Widgets
	// ---------------------------

	/** Health progress bar (0-1) */
	UPROPERTY(meta = (BindWidget))
	TObjectPtr<UProgressBar> HealthBar;

	/** Shield progress bar (0-1) */
	UPROPERTY(meta = (BindWidget))
	TObjectPtr<UProgressBar> ShieldBar;

	/** Impeto progress bar (0-1) */
	UPROPERTY(meta = (BindWidget))
	TObjectPtr<UProgressBar> ImpetoBar;

	/** Character icon image */
	UPROPERTY(meta = (BindWidget))
	TObjectPtr<UImage> CharacterIcon;

	/** Player name text (optional) */
	UPROPERTY(meta = (BindWidgetOptional))
	TObjectPtr<UTextBlock> PlayerNameText;

	// ---------------------------
	// Optional Text Displays
	// ---------------------------

	/** Optional text showing Health as "current/max" */
	UPROPERTY(meta = (BindWidgetOptional))
	TObjectPtr<UTextBlock> HealthText;

	/** Optional text showing Shield as "current/max" */
	UPROPERTY(meta = (BindWidgetOptional))
	TObjectPtr<UTextBlock> ShieldText;

	/** Optional text showing Impeto as "current/max" */
	UPROPERTY(meta = (BindWidgetOptional))
	TObjectPtr<UTextBlock> ImpetoText;

private:
	// ---------------------------
	// Internal State
	// ---------------------------

	/** Weak reference to the observed PlayerState */
	TWeakObjectPtr<AFNRPlayerState> ObservedPS;

	/** Cached CharacterId for detecting changes */
	FName CachedCharacterId;

	// ---------------------------
	// Delegate Handlers
	// ---------------------------

	/** Called when vitals change on the observed PlayerState */
	UFUNCTION()
	void OnObservedVitalsChanged();

	/** Called when character changes on the observed PlayerState */
	UFUNCTION()
	void OnObservedCharacterChanged(FName NewCharacterId);

	/** Called when the observed PlayerState's team changes */
	UFUNCTION()
	void OnObservedTeamChanged(int32 NewTeamId);

	// ---------------------------
	// Internal Helpers
	// ---------------------------

	/** Unbind from current observed PlayerState */
	void UnbindFromObserved();

	/** Bind to a new observed PlayerState */
	void BindToObserved(AFNRPlayerState* PS);

	/** Update the character icon from CharacterId */
	void UpdateCharacterIcon(FName CharacterId);

	/** Calculate progress value with clamping and zero division protection */
	static float CalculateProgress(float Current, float Max);
};
