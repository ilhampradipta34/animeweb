import { LIMIT_LISTS } from "@/constants/listConstant";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Pagination, Select, SelectItem } from "@heroui/react";

interface PropTypes {
  totalPages: number;
}

const FooterJadwalRilis = (props: PropTypes) => {
  const { totalPages } = props;
  const { currentLimit, handleChangeLimit, currentPage, handleChangePage } =
    useChangeUrl();
  return (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
      <Select
        className="max-w-28"
        size="md"
        selectedKeys={[`${currentLimit}`]}
        selectionMode="single"
        onChange={handleChangeLimit}
        startContent={<p className="text-small">Show</p>}
        disallowEmptySelection
      >
        {LIMIT_LISTS.map((item) => (
          <SelectItem key={item.value}>{item.label}</SelectItem>
        ))}
      </Select>

      {totalPages > 1 && (
        <Pagination
          isCompact
          showControls
          color="primary"
          page={Number(currentPage)}
          total={totalPages}
          onChange={handleChangePage}
          loop
        />
      )}
    </div>
  );
};

export default FooterJadwalRilis;
