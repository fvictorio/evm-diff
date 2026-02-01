import type { PublicClient } from 'viem';

export type TransactionType = {
	type: number;
	name: string;
	supported: boolean;
};

// Transaction type definitions based on EIPs
export const transactionTypes: { type: number; name: string }[] = [
	{ type: 0, name: 'Legacy' },
	{ type: 1, name: 'EIP-2930 (Access List)' },
	{ type: 2, name: 'EIP-1559 (Fee Market)' },
	{ type: 3, name: 'EIP-4844 (Blob)' },
	{ type: 4, name: 'EIP-7702 (Set Code)' },
];

export async function checkTransactionTypes(client: PublicClient): Promise<TransactionType[]> {
	// For now, return all transaction types with supported: false
	// Detection logic will be implemented later
	const results: TransactionType[] = transactionTypes.map(({ type, name }) => ({
		type,
		name,
		supported: false,
	}));

	return results;
}
