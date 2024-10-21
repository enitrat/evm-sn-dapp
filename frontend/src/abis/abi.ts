export const ABI = [
  {
    type: "impl",
    name: "SimpleCounterImpl",
    interface_name: "shared_counter::ISimpleCounter",
  },
  {
    type: "enum",
    name: "shared_counter::CallerType",
    variants: [
      {
        name: "Starknet",
        type: "()",
      },
      {
        name: "Kakarot",
        type: "()",
      },
    ],
  },
  {
    type: "interface",
    name: "shared_counter::ISimpleCounter",
    items: [
      {
        type: "function",
        name: "increase_counter",
        inputs: [
          {
            name: "increment",
            type: "core::integer::u128",
          },
          {
            name: "caller_type",
            type: "shared_counter::CallerType",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_counter",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_last_caller",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_n_callers_by_type",
        inputs: [
          {
            name: "caller_type",
            type: "shared_counter::CallerType",
          },
        ],
        outputs: [
          {
            type: "core::integer::u128",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "event",
    name: "shared_counter::SimpleCounter::Event",
    kind: "enum",
    variants: [],
  },
] as const as any;
