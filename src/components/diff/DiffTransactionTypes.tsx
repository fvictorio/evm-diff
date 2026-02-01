import type { Chain } from '@/../script/index';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';

type TransactionType = Chain['transactionTypes'][0];
type Props = {
	base: TransactionType[];
	target: TransactionType[];
	onlyShowDiff: boolean;
};

const FormattedSupport = ({ txType }: { txType: TransactionType | undefined }) => {
	if (!txType) return <div>Not present</div>;
	return <div>{txType.supported ? 'Yes' : 'No'}</div>;
};

export const DiffTransactionTypes = ({ base, target, onlyShowDiff }: Props) => {
	// Generate a sorted list of all transaction types from both base and target.
	const allTypes = [...base.map((t) => t.type), ...target.map((t) => t.type)];
	const txTypes = [...new Set(allTypes)].sort((a, b) => a - b);

	const diffContent = (
		<>
			{txTypes.map((type) => {
				const baseTxType = base.find((t) => t.type === type);
				const targetTxType = target.find((t) => t.type === type);

				const isEqual = JSON.stringify(baseTxType) === JSON.stringify(targetTxType);
				const show = !isEqual || !onlyShowDiff;

				if (!show) return null;
				return (
					<div
						key={type}
						className="grid grid-cols-12 items-center border-b border-zinc-500/10 py-2 dark:border-zinc-500/20"
					>
						<div className="col-span-2">
							<div>{baseTxType?.name || targetTxType?.name}</div>
							<div className="text-secondary text-sm">Type {type}</div>
						</div>
						<div className="col-span-5 pr-4">
							<FormattedSupport txType={baseTxType} />
						</div>
						<div className="col-span-5">
							<FormattedSupport txType={targetTxType} />
						</div>
					</div>
				);
			})}
		</>
	);

	return <RenderDiff content={diffContent} />;
};
