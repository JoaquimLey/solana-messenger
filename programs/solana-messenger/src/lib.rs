use anchor_lang::prelude::*;

declare_id!("Go4kr5mpUn8dgrCPBmkAbYDgK5Jagja6MAfHF7LsuyP2");

#[program]
pub mod solana_messenger {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>, data: String) -> ProgramResult {
        let base_account = &mut _ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }

    pub fn update(_ctx: Context<Update>, data: String) -> ProgramResult {
        let base_account = &mut _ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 64)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub data: String,
    pub data_list: Vec<String>,
}