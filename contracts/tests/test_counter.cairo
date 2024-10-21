use shared_counter::ISimpleCounterDispatcher;
use shared_counter::ISimpleCounterDispatcherTrait;
use shared_counter::CallerType;
use snforge_std::{declare, DeclareResultTrait, ContractClassTrait};

#[test]
fn test_simple_counter() {
    let class = declare("SimpleCounter").unwrap().contract_class();
    let args = array![];
    let (contract_address, _) = class.deploy(@args).unwrap();
    let contract = ISimpleCounterDispatcher{contract_address};

    // Prev
    let prev_counter = contract.get_counter();
    let prev_last_caller = contract.get_last_caller();
    let prev_n_callers_kakarot = contract.get_n_callers_by_type(CallerType::Kakarot);
    let prev_n_callers_starknet = contract.get_n_callers_by_type(CallerType::Starknet);

    assert_eq!(prev_counter, 0);
    assert_eq!(prev_last_caller, 0.try_into().unwrap());
    assert_eq!(prev_n_callers_kakarot, 0);
    assert_eq!(prev_n_callers_starknet, 0);

    contract.increase_counter(5, CallerType::Kakarot);
    contract.increase_counter(3, CallerType::Starknet);

    assert_eq!(contract.get_counter(), 8);
    assert_eq!(contract.get_n_callers_by_type(CallerType::Kakarot), 1);
    assert_eq!(contract.get_n_callers_by_type(CallerType::Starknet), 1);
}
