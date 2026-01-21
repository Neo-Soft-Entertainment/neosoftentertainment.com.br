// Copyright Neo-Soft Entertainment. All Rights Reserved.

#include "Data/FNRCharacterDataAsset.h"

UFNRCharacterDataAsset::UFNRCharacterDataAsset()
{
}

bool UFNRCharacterDataAsset::FindCharacterData(FName CharacterId, FFNRCharacterData& OutData) const
{
	for (const FFNRCharacterData& CharData : Characters)
	{
		if (CharData.CharacterId == CharacterId)
		{
			OutData = CharData;
			return true;
		}
	}
	
	return false;
}

FFNRCharacterData UFNRCharacterDataAsset::GetCharacterData(FName CharacterId) const
{
	for (const FFNRCharacterData& CharData : Characters)
	{
		if (CharData.CharacterId == CharacterId)
		{
			return CharData;
		}
	}
	
	return FFNRCharacterData();
}

bool UFNRCharacterDataAsset::HasCharacter(FName CharacterId) const
{
	for (const FFNRCharacterData& CharData : Characters)
	{
		if (CharData.CharacterId == CharacterId)
		{
			return true;
		}
	}
	
	return false;
}

TArray<FName> UFNRCharacterDataAsset::GetAllCharacterIds() const
{
	TArray<FName> Result;
	Result.Reserve(Characters.Num());
	
	for (const FFNRCharacterData& CharData : Characters)
	{
		Result.Add(CharData.CharacterId);
	}
	
	return Result;
}
