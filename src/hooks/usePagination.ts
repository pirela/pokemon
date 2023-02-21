import {  useCallback, useState } from "react";

export const usePagination = (totalRows: any = 0) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffeset] = useState(0);
  const [records, setRecords] = useState(5);
  const [limit, setLimit] = useState(5);

  const goToFirstPag = () => {
    setOffeset(0);
    setLimit(records);
    setCurrentPage(1);
  };

  const goToLastPag = () => {
    setOffeset(Math.ceil(totalRows / records) * records - records);
    setLimit(Math.ceil(totalRows / records) * records);
    setCurrentPage(Math.ceil(totalRows / records));
  };

  const changeOffset = (isAdd = true) => {
    if (isAdd && totalRows > limit) {
      setOffeset(offset + records);
      setLimit(limit + records);
      setCurrentPage(currentPage + 1);
    } else if (!isAdd && offset > 0) {
      setOffeset(offset - records);
      setLimit(limit - records);
      setCurrentPage(currentPage - 1);
    }
  };

  const changeRecords = useCallback((e: any) => {
    const newRecords = Number(e.target.value);
    setRecords(newRecords);
    setLimit(newRecords);
    setOffeset(0);
    setCurrentPage(1)
  }, []);

  return {
    goToFirstPag,
    goToLastPag,
    changeOffset,
    changeRecords,
    currentPage,
    offset,
    records,
    limit,
  };
};
