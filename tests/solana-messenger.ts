import * as anchor from "@project-serum/anchor";
import { Program } from '@project-serum/anchor';
import assert from 'assert';
const { SystemProgram } = anchor.web3;

// SolanaMessenger Program types
import { SolanaMessenger } from '../target/types/solana_messenger';

describe("solana-messenger app: ", () => {
  // Before all
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SolanaMessenger as Program<SolanaMessenger>;
  
  it("An account is initialized", async () => {
    // Given
    const baseAccount = anchor.web3.Keypair.generate();
    const baseAccountMessage = "My first message"
    // When
    await program.rpc.initialize(baseAccountMessage, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount]
    });
    // Then
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Data: ', account.data);
    assert.ok(account.data === baseAccountMessage);
  });


  it("Update the account previously created: ", async () => {
    // Given
    const baseAccount = anchor.web3.Keypair.generate();
    const baseAccountMessage = "My first message"
    await program.rpc.initialize(baseAccountMessage, {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount]
    });

    // When    
    const baseAccountUpdatedMessage = "My second message"
    await program.rpc.update(baseAccountUpdatedMessage, {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Data: ', account.data);
    assert.ok(account.data === baseAccountUpdatedMessage);
  });
});