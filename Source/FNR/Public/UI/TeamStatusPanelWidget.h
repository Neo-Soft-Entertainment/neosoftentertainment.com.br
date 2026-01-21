// Copyright Neo-Soft Entertainment. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "TeamStatusPanelWidget.generated.h"

class APlayerState;
class AFNRPlayerState;
class AGameStateBase;
class UPanelWidget;
class UTeamMemberStatusEntryWidget;
class UFNRCharacterDataAsset;

/**
 * Delegate broadcast when the team member list is rebuilt.
 * Blueprint can bind for animations.
 */
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnTeamListRefreshed);

/**
 * Main widget that displays the status of all team members.
 * Creates and manages TeamMemberStatusEntryWidget instances for each player on the same team.
 * 
 * USAGE:
 * 1. Create a UMG widget blueprint that inherits from this class
 * 2. Add a PanelWidget (VerticalBox, HorizontalBox, etc.) with name "MembersContainer" (BindWidget)
 * 3. Set EntryClass to your TeamMemberStatusEntryWidget blueprint
 * 4. Set CharacterDataAsset to your character data
 * 5. Add this widget to your HUD
 * 
 * FEATURES:
 * - Automatically detects team from OwningPlayer's PlayerState
 * - Creates entry widgets for each team member
 * - Updates list when players join/leave or change teams
 * - No Tick - all updates via events
 * - Configurable: include/exclude self
 */
UCLASS(Blueprintable, BlueprintType)
class FNR_API UTeamStatusPanelWidget : public UUserWidget
{
	GENERATED_BODY()

public:
	UTeamStatusPanelWidget(const FObjectInitializer& ObjectInitializer);

	// ---------------------------
	// Public API
	// ---------------------------

	/**
	 * Manually refresh the team member list.
	 * Normally called automatically when team composition changes.
	 */
	UFUNCTION(BlueprintCallable, Category = "FNR|TeamStatus")
	void RefreshTeamMembers();

	/**
	 * Get the team ID of the owning player.
	 * Returns INDEX_NONE if not available.
	 */
	UFUNCTION(BlueprintCallable, Category = "FNR|TeamStatus")
	int32 GetOwningTeamId() const;

	/**
	 * Get the number of team members currently displayed.
	 */
	UFUNCTION(BlueprintCallable, Category = "FNR|TeamStatus")
	int32 GetTeamMemberCount() const;

	// ---------------------------
	// Configuration
	// ---------------------------

	/** Widget class to use for each team member entry */
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "FNR|TeamStatus|Config")
	TSubclassOf<UTeamMemberStatusEntryWidget> EntryClass;

	/** Whether to include the local player in the team list */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "FNR|TeamStatus|Config")
	bool bIncludeSelf;

	/** Data asset for character icons - passed to each entry widget */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "FNR|TeamStatus|Config")
	TObjectPtr<UFNRCharacterDataAsset> CharacterDataAsset;

	// ---------------------------
	// Blueprint Events
	// ---------------------------

	/** Broadcast when the team list is refreshed */
	UPROPERTY(BlueprintAssignable, Category = "FNR|TeamStatus|Events")
	FOnTeamListRefreshed OnTeamListRefreshed;

protected:
	// ---------------------------
	// UUserWidget Overrides
	// ---------------------------

	virtual void NativeOnInitialized() override;
	virtual void NativeConstruct() override;
	virtual void NativeDestruct() override;

	// ---------------------------
	// Bound Widgets
	// ---------------------------

	/** Container panel where entry widgets are added */
	UPROPERTY(meta = (BindWidget))
	TObjectPtr<UPanelWidget> MembersContainer;

private:
	// ---------------------------
	// Entry Management
	// ---------------------------

	/** Map of PlayerState -> Entry widget */
	UPROPERTY()
	TMap<TWeakObjectPtr<APlayerState>, TObjectPtr<UTeamMemberStatusEntryWidget>> Entries;

	/**
	 * Ensure an entry widget exists for the given PlayerState.
	 * Creates one if it doesn't exist.
	 * @param PS The PlayerState to create/get entry for
	 * @return The entry widget
	 */
	UTeamMemberStatusEntryWidget* EnsureEntry(APlayerState* PS);

	/**
	 * Remove the entry widget for the given PlayerState.
	 * @param PS The PlayerState to remove entry for
	 */
	void RemoveEntry(APlayerState* PS);

	/**
	 * Remove all entry widgets.
	 */
	void ClearAllEntries();

	/**
	 * Clean up entries for PlayerStates that are no longer valid or on the team.
	 * @param ValidTeamMembers Set of PlayerStates that should have entries
	 */
	void CleanupStaleEntries(const TSet<APlayerState*>& ValidTeamMembers);

	// ---------------------------
	// Event Binding
	// ---------------------------

	/** Bind to game state and player state events */
	void BindToEvents();

	/** Unbind from all events */
	void UnbindFromEvents();

	/** Get the owning player's FNRPlayerState */
	AFNRPlayerState* GetOwningFNRPlayerState() const;

	// ---------------------------
	// Event Handlers
	// ---------------------------

	/**
	 * Called when owning player's team changes.
	 * Triggers full rebuild of the team list.
	 */
	UFUNCTION()
	void OnOwningTeamChanged(int32 NewTeamId);

	// ---------------------------
	// Cached References
	// ---------------------------

	/** Cached reference to owning player's PlayerState */
	TWeakObjectPtr<AFNRPlayerState> CachedOwningPS;

	/** Flag to prevent redundant refreshes */
	bool bIsRefreshing;
};
