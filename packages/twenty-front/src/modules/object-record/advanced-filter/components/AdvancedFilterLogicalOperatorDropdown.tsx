import { ADVANCED_FILTER_LOGICAL_OPERATOR_OPTIONS } from '@/object-record/advanced-filter/constants/AdvancedFilterLogicalOperatorOptions';
import { useUpsertCombinedViewFilterGroup } from '@/object-record/advanced-filter/hooks/useUpsertCombinedViewFilterGroup';
import { useUpsertRecordFilterGroup } from '@/object-record/record-filter-group/hooks/useUpsertRecordFilterGroup';
import { RecordFilterGroupLogicalOperator } from '@/object-record/record-filter-group/types/RecordFilterGroupLogicalOperator';
import { Select } from '@/ui/input/components/Select';
import { ViewFilterGroup } from '@/views/types/ViewFilterGroup';
import { ViewFilterGroupLogicalOperator } from '@/views/types/ViewFilterGroupLogicalOperator';

type AdvancedFilterLogicalOperatorDropdownProps = {
  viewFilterGroup: ViewFilterGroup;
};

export const AdvancedFilterLogicalOperatorDropdown = ({
  viewFilterGroup,
}: AdvancedFilterLogicalOperatorDropdownProps) => {
  const { upsertCombinedViewFilterGroup } = useUpsertCombinedViewFilterGroup();
  const { upsertRecordFilterGroup } = useUpsertRecordFilterGroup();

  const handleChange = (value: ViewFilterGroupLogicalOperator) => {
    upsertCombinedViewFilterGroup({
      ...viewFilterGroup,
      logicalOperator: value,
    });

    upsertRecordFilterGroup({
      id: viewFilterGroup.id,
      parentRecordFilterGroupId: viewFilterGroup.parentViewFilterGroupId,
      positionInRecordFilterGroup: viewFilterGroup.positionInViewFilterGroup,
      logicalOperator:
        value === ViewFilterGroupLogicalOperator.AND
          ? RecordFilterGroupLogicalOperator.AND
          : RecordFilterGroupLogicalOperator.OR,
    });
  };

  return (
    <Select
      fullWidth
      dropdownId={`advanced-filter-logical-operator-${viewFilterGroup.id}`}
      value={viewFilterGroup.logicalOperator}
      onChange={handleChange}
      options={ADVANCED_FILTER_LOGICAL_OPERATOR_OPTIONS}
    />
  );
};
