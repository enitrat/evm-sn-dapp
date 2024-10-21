use starknet::ContractAddress;

#[derive(Drop, Serde, Copy, starknet::Store, Hash)]
pub enum CallerType {
    #[default]
    Starknet,
    Kakarot,
}

#[starknet::interface]
pub trait ISimpleCounter<TContractState> {
    fn increase_counter(ref self: TContractState, increment: u128, caller_type: CallerType);
    fn get_counter(self: @TContractState) -> u128;
    fn get_last_caller(self: @TContractState) -> ContractAddress;
    fn get_n_callers_by_type(self: @TContractState, caller_type: CallerType) -> u128;
}

#[starknet::contract]
pub mod SimpleCounter {
    use core::starknet::{ContractAddress, get_caller_address};
    use super::CallerType;
    use core::starknet::storage::{Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    pub struct Storage {
        counter: u128,
        last_caller: ContractAddress,
        n_callers_by_type: Map::<CallerType, u128>,
    }

    #[abi(embed_v0)]
    pub impl SimpleCounterImpl of super::ISimpleCounter<ContractState> {
        fn increase_counter(ref self: ContractState, increment: u128, caller_type: CallerType) {
            // Update counter
            let current_count = self.counter.read();
            self.counter.write(current_count + increment);

            // Update last caller
            let caller = get_caller_address();
            self.last_caller.write(caller);

            // Update n_callers_by_type
            let current_n_callers = self.n_callers_by_type.entry(caller_type).read();
            self.n_callers_by_type.entry(caller_type).write(current_n_callers + 1);
        }

        fn get_counter(self: @ContractState) -> u128 {
            self.counter.read()
        }

        fn get_last_caller(self: @ContractState) -> ContractAddress {
            self.last_caller.read()
        }

        fn get_n_callers_by_type(self: @ContractState, caller_type: CallerType) -> u128 {
            self.n_callers_by_type.entry(caller_type).read()
        }
    }
}
