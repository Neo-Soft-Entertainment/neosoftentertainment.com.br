// Copyright Neo-Soft Entertainment. All Rights Reserved.

#include "Player/FNRPlayerState.h"
#include "Player/FNRVitalsComponent.h"
#include "AbilitySystemComponent.h"
#include "Net/UnrealNetwork.h"

AFNRPlayerState::AFNRPlayerState()
{
	// Default team ID (no team)
	TeamId = INDEX_NONE;
	
	// Default character ID (none selected)
	CharacterId = NAME_None;

	// Create the VitalsComponent
	VitalsComponent = CreateDefaultSubobject<UFNRVitalsComponent>(TEXT("VitalsComponent"));

	// Create ASC if using GAS on PlayerState.
	// If your project uses GAS on Pawn instead, you can set this to nullptr
	// and have VitalsComponent read from Pawn's ASC.
	AbilitySystemComponent = CreateDefaultSubobject<UAbilitySystemComponent>(TEXT("AbilitySystemComponent"));
	if (AbilitySystemComponent)
	{
		// Set replication mode for multiplayer
		AbilitySystemComponent->SetIsReplicated(true);
		// Mixed mode: GameplayEffects replicated to owning client, tags/cues to all
		AbilitySystemComponent->SetReplicationMode(EGameplayEffectReplicationMode::Mixed);
	}
}

void AFNRPlayerState::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
{
	Super::GetLifetimeReplicatedProps(OutLifetimeProps);

	DOREPLIFETIME(AFNRPlayerState, TeamId);
	DOREPLIFETIME(AFNRPlayerState, CharacterId);
}

UAbilitySystemComponent* AFNRPlayerState::GetAbilitySystemComponent() const
{
	return AbilitySystemComponent;
}

void AFNRPlayerState::SetTeamId(int32 NewTeamId)
{
	if (!HasAuthority())
	{
		return;
	}

	if (TeamId != NewTeamId)
	{
		const int32 OldTeamId = TeamId;
		TeamId = NewTeamId;
		
		// Broadcast on server
		OnTeamChanged.Broadcast(TeamId);
		
		// Force replication
		ForceNetUpdate();
	}
}

void AFNRPlayerState::SetCharacterId(FName NewCharacterId)
{
	if (!HasAuthority())
	{
		return;
	}

	if (CharacterId != NewCharacterId)
	{
		const FName OldCharacterId = CharacterId;
		CharacterId = NewCharacterId;
		
		// Broadcast on server
		OnCharacterChanged.Broadcast(CharacterId);
		
		// Force replication
		ForceNetUpdate();
	}
}

void AFNRPlayerState::OnRep_TeamId(int32 OldTeamId)
{
	// Broadcast delegate on clients when TeamId is replicated
	OnTeamChanged.Broadcast(TeamId);
}

void AFNRPlayerState::OnRep_CharacterId(FName OldCharacterId)
{
	// Broadcast delegate on clients when CharacterId is replicated
	OnCharacterChanged.Broadcast(CharacterId);
}

// ---------------------------
// Vitals Facade Functions
// ---------------------------

float AFNRPlayerState::GetHealth() const
{
	if (VitalsComponent)
	{
		return VitalsComponent->GetHealth();
	}
	return 0.0f;
}

float AFNRPlayerState::GetHealthMax() const
{
	if (VitalsComponent)
	{
		return VitalsComponent->GetHealthMax();
	}
	return 1.0f; // Avoid division by zero
}

float AFNRPlayerState::GetShield() const
{
	if (VitalsComponent)
	{
		return VitalsComponent->GetShield();
	}
	return 0.0f;
}

float AFNRPlayerState::GetShieldMax() const
{
	if (VitalsComponent)
	{
		return VitalsComponent->GetShieldMax();
	}
	return 1.0f; // Avoid division by zero
}

float AFNRPlayerState::GetImpeto() const
{
	if (VitalsComponent)
	{
		return VitalsComponent->GetImpeto();
	}
	return 0.0f;
}

float AFNRPlayerState::GetImpetoMax() const
{
	if (VitalsComponent)
	{
		return VitalsComponent->GetImpetoMax();
	}
	return 1.0f; // Avoid division by zero
}
