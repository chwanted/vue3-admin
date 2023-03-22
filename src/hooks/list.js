export const paginationConfig = {
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: total => `共 ${total} 条`
};
export function initPaginationConfig(form, fetch) {
  return {
    ...paginationConfig,
    onShowSizeChange: (current, size) => {
      form.pageNo = current;
      form.pageSize = size;
      fetch();
    },
    onChange: (page, pageSize) => {
      form.pageNo = page;
      form.pageSize = pageSize;
      fetch();
    }
  };
}
