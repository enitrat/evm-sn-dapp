export const KAKAROT_ABI = [
  {
    type: "impl",
    name: "KakarotCoreImpl",
    interface_name: "contracts::kakarot_core::interface::IKakarotCore",
  },
  {
    type: "struct",
    name: "core::starknet::eth_address::EthAddress",
    members: [
      {
        name: "address",
        type: "core::felt252",
      },
    ],
  },
  {
    type: "interface",
    name: "contracts::kakarot_core::interface::IKakarotCore",
    items: [
      {
        type: "function",
        name: "set_native_token",
        inputs: [
          {
            name: "native_token",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_native_token",
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
        name: "address_registry",
        inputs: [
          {
            name: "evm_address",
            type: "core::starknet::eth_address::EthAddress",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "deploy_externally_owned_account",
        inputs: [
          {
            name: "evm_address",
            type: "core::starknet::eth_address::EthAddress",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "upgrade",
        inputs: [
          {
            name: "new_class_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "set_account_contract_class_hash",
        inputs: [
          {
            name: "new_class_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_account_contract_class_hash",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "uninitialized_account_class_hash",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "set_account_class_hash",
        inputs: [
          {
            name: "new_class_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "register_account",
        inputs: [
          {
            name: "evm_address",
            type: "core::starknet::eth_address::EthAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_block_gas_limit",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_base_fee",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "set_base_fee",
        inputs: [
          {
            name: "base_fee",
            type: "core::integer::u64",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_starknet_address",
        inputs: [
          {
            name: "evm_address",
            type: "core::starknet::eth_address::EthAddress",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "impl",
    name: "OwnableImpl",
    interface_name: "contracts::components::ownable::IOwnable",
  },
  {
    type: "interface",
    name: "contracts::components::ownable::IOwnable",
    items: [
      {
        type: "function",
        name: "owner",
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
        name: "transfer_ownership",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "renounce_ownership",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "EthRPCImpl",
    interface_name: "contracts::kakarot_core::eth_rpc::IEthRPC",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "enum",
    name: "core::option::Option::<core::integer::u64>",
    variants: [
      {
        name: "Some",
        type: "core::integer::u64",
      },
      {
        name: "None",
        type: "()",
      },
    ],
  },
  {
    type: "enum",
    name: "utils::eth_transaction::common::TxKind",
    variants: [
      {
        name: "Create",
        type: "()",
      },
      {
        name: "Call",
        type: "core::starknet::eth_address::EthAddress",
      },
    ],
  },
  {
    type: "struct",
    name: "core::array::Span::<core::integer::u8>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::integer::u8>",
      },
    ],
  },
  {
    type: "struct",
    name: "utils::eth_transaction::legacy::TxLegacy",
    members: [
      {
        name: "chain_id",
        type: "core::option::Option::<core::integer::u64>",
      },
      {
        name: "nonce",
        type: "core::integer::u64",
      },
      {
        name: "gas_price",
        type: "core::integer::u128",
      },
      {
        name: "gas_limit",
        type: "core::integer::u64",
      },
      {
        name: "to",
        type: "utils::eth_transaction::common::TxKind",
      },
      {
        name: "value",
        type: "core::integer::u256",
      },
      {
        name: "input",
        type: "core::array::Span::<core::integer::u8>",
      },
    ],
  },
  {
    type: "struct",
    name: "core::array::Span::<core::integer::u256>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::integer::u256>",
      },
    ],
  },
  {
    type: "struct",
    name: "utils::eth_transaction::eip2930::AccessListItem",
    members: [
      {
        name: "ethereum_address",
        type: "core::starknet::eth_address::EthAddress",
      },
      {
        name: "storage_keys",
        type: "core::array::Span::<core::integer::u256>",
      },
    ],
  },
  {
    type: "struct",
    name: "core::array::Span::<utils::eth_transaction::eip2930::AccessListItem>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<utils::eth_transaction::eip2930::AccessListItem>",
      },
    ],
  },
  {
    type: "struct",
    name: "utils::eth_transaction::eip2930::TxEip2930",
    members: [
      {
        name: "chain_id",
        type: "core::integer::u64",
      },
      {
        name: "nonce",
        type: "core::integer::u64",
      },
      {
        name: "gas_price",
        type: "core::integer::u128",
      },
      {
        name: "gas_limit",
        type: "core::integer::u64",
      },
      {
        name: "to",
        type: "utils::eth_transaction::common::TxKind",
      },
      {
        name: "value",
        type: "core::integer::u256",
      },
      {
        name: "access_list",
        type: "core::array::Span::<utils::eth_transaction::eip2930::AccessListItem>",
      },
      {
        name: "input",
        type: "core::array::Span::<core::integer::u8>",
      },
    ],
  },
  {
    type: "struct",
    name: "utils::eth_transaction::eip1559::TxEip1559",
    members: [
      {
        name: "chain_id",
        type: "core::integer::u64",
      },
      {
        name: "nonce",
        type: "core::integer::u64",
      },
      {
        name: "gas_limit",
        type: "core::integer::u64",
      },
      {
        name: "max_fee_per_gas",
        type: "core::integer::u128",
      },
      {
        name: "max_priority_fee_per_gas",
        type: "core::integer::u128",
      },
      {
        name: "to",
        type: "utils::eth_transaction::common::TxKind",
      },
      {
        name: "value",
        type: "core::integer::u256",
      },
      {
        name: "access_list",
        type: "core::array::Span::<utils::eth_transaction::eip2930::AccessListItem>",
      },
      {
        name: "input",
        type: "core::array::Span::<core::integer::u8>",
      },
    ],
  },
  {
    type: "enum",
    name: "utils::eth_transaction::transaction::Transaction",
    variants: [
      {
        name: "Legacy",
        type: "utils::eth_transaction::legacy::TxLegacy",
      },
      {
        name: "Eip2930",
        type: "utils::eth_transaction::eip2930::TxEip2930",
      },
      {
        name: "Eip1559",
        type: "utils::eth_transaction::eip1559::TxEip1559",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "interface",
    name: "contracts::kakarot_core::eth_rpc::IEthRPC",
    items: [
      {
        type: "function",
        name: "eth_get_balance",
        inputs: [
          {
            name: "address",
            type: "core::starknet::eth_address::EthAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "eth_get_transaction_count",
        inputs: [
          {
            name: "address",
            type: "core::starknet::eth_address::EthAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "eth_chain_id",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "eth_call",
        inputs: [
          {
            name: "origin",
            type: "core::starknet::eth_address::EthAddress",
          },
          {
            name: "tx",
            type: "utils::eth_transaction::transaction::Transaction",
          },
        ],
        outputs: [
          {
            type: "(core::bool, core::array::Span::<core::integer::u8>, core::integer::u64)",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "eth_estimate_gas",
        inputs: [
          {
            name: "origin",
            type: "core::starknet::eth_address::EthAddress",
          },
          {
            name: "tx",
            type: "utils::eth_transaction::transaction::Transaction",
          },
        ],
        outputs: [
          {
            type: "(core::bool, core::array::Span::<core::integer::u8>, core::integer::u64)",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "eth_send_raw_unsigned_tx",
        inputs: [
          {
            name: "tx_data",
            type: "core::array::Span::<core::integer::u8>",
          },
        ],
        outputs: [
          {
            type: "(core::bool, core::array::Span::<core::integer::u8>, core::integer::u64)",
          },
        ],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "struct",
    name: "core::array::Span::<core::starknet::eth_address::EthAddress>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::starknet::eth_address::EthAddress>",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "native_token",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "account_contract_class_hash",
        type: "core::starknet::class_hash::ClassHash",
      },
      {
        name: "uninitialized_account_class_hash",
        type: "core::starknet::class_hash::ClassHash",
      },
      {
        name: "coinbase",
        type: "core::starknet::eth_address::EthAddress",
      },
      {
        name: "block_gas_limit",
        type: "core::integer::u64",
      },
      {
        name: "eoas_to_deploy",
        type: "core::array::Span::<core::starknet::eth_address::EthAddress>",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::components::ownable::ownable_component::OwnershipTransferred",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::components::ownable::ownable_component::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnershipTransferred",
        type: "contracts::components::ownable::ownable_component::OwnershipTransferred",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::components::upgradeable::upgradeable_component::ContractUpgraded",
    kind: "struct",
    members: [
      {
        name: "new_class_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::components::upgradeable::upgradeable_component::Event",
    kind: "enum",
    variants: [
      {
        name: "ContractUpgraded",
        type: "contracts::components::upgradeable::upgradeable_component::ContractUpgraded",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::kakarot_core::kakarot::KakarotCore::AccountDeployed",
    kind: "struct",
    members: [
      {
        name: "evm_address",
        type: "core::starknet::eth_address::EthAddress",
        kind: "key",
      },
      {
        name: "starknet_address",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::kakarot_core::kakarot::KakarotCore::AccountClassHashChange",
    kind: "struct",
    members: [
      {
        name: "old_class_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data",
      },
      {
        name: "new_class_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::kakarot_core::kakarot::KakarotCore::EOAClassHashChange",
    kind: "struct",
    members: [
      {
        name: "old_class_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data",
      },
      {
        name: "new_class_hash",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "contracts::kakarot_core::kakarot::KakarotCore::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnableEvent",
        type: "contracts::components::ownable::ownable_component::Event",
        kind: "nested",
      },
      {
        name: "UpgradeableEvent",
        type: "contracts::components::upgradeable::upgradeable_component::Event",
        kind: "nested",
      },
      {
        name: "AccountDeployed",
        type: "contracts::kakarot_core::kakarot::KakarotCore::AccountDeployed",
        kind: "nested",
      },
      {
        name: "AccountClassHashChange",
        type: "contracts::kakarot_core::kakarot::KakarotCore::AccountClassHashChange",
        kind: "nested",
      },
      {
        name: "EOAClassHashChange",
        type: "contracts::kakarot_core::kakarot::KakarotCore::EOAClassHashChange",
        kind: "nested",
      },
    ],
  },
] as const as any;
