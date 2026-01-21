// Copyright Neo-Soft Entertainment. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "Engine/DataAsset.h"
#include "FNRCharacterDataAsset.generated.h"

/**
 * Data structure for a single character (boneco) entry.
 */
USTRUCT(BlueprintType)
struct FFNRCharacterData
{
	GENERATED_BODY()

	/** Unique identifier for this character */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Character")
	FName CharacterId;

	/** Display name shown in UI */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Character")
	FText DisplayName;

	/** Icon texture for this character */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Character")
	TSoftObjectPtr<UTexture2D> Icon;

	/** Optional: Full body portrait */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Character")
	TSoftObjectPtr<UTexture2D> Portrait;

	FFNRCharacterData()
		: CharacterId(NAME_None)
		, DisplayName(FText::GetEmpty())
	{
	}
};

/**
 * Data Asset containing all available characters (bonecos) and their visual data.
 * Use this to map CharacterId -> Icon, DisplayName, etc.
 * 
 * USAGE:
 * 1. Create a Data Asset of this type in the Editor (Right-click -> Data -> FNR Character Data Asset)
 * 2. Add entries for each character with their CharacterId, DisplayName, and Icon
 * 3. Reference this asset in your TeamMemberStatusEntryWidget or GameInstance
 * 4. Call FindCharacterData() to get the data for a specific CharacterId
 */
UCLASS(BlueprintType)
class FNR_API UFNRCharacterDataAsset : public UPrimaryDataAsset
{
	GENERATED_BODY()

public:
	UFNRCharacterDataAsset();

	/** List of all available characters */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Characters")
	TArray<FFNRCharacterData> Characters;

	/**
	 * Find character data by ID.
	 * @param CharacterId The ID to search for
	 * @param OutData The found character data
	 * @return true if found, false otherwise
	 */
	UFUNCTION(BlueprintCallable, Category = "FNR|Characters")
	bool FindCharacterData(FName CharacterId, FFNRCharacterData& OutData) const;

	/**
	 * Get character data by ID (returns null data if not found).
	 * @param CharacterId The ID to search for
	 * @return The character data, or empty data if not found
	 */
	UFUNCTION(BlueprintCallable, Category = "FNR|Characters")
	FFNRCharacterData GetCharacterData(FName CharacterId) const;

	/**
	 * Check if a character ID exists in this asset.
	 * @param CharacterId The ID to check
	 * @return true if the character exists
	 */
	UFUNCTION(BlueprintCallable, Category = "FNR|Characters")
	bool HasCharacter(FName CharacterId) const;

	/**
	 * Get all character IDs.
	 * @return Array of all character IDs
	 */
	UFUNCTION(BlueprintCallable, Category = "FNR|Characters")
	TArray<FName> GetAllCharacterIds() const;
};
