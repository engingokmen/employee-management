export class PaginationController {
  constructor(host, items = [], rowsPerPage = 5) {
    this.host = host;
    this.host.addController(this);
    this.items = items;
    this.rowsPerPage = rowsPerPage;
    this.currentPage = 1;
  }

  changeItems(items) {
    this.items = items;
    this.currentPage = 1;
    this.host.requestUpdate();
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.items.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.items.length / this.rowsPerPage);
  }

  changePage(page) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.host.requestUpdate();
    }
  }
}
