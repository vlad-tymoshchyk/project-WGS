import React, { Component } from 'react';
import {
  FaCaretUp,
  FaCaretDown,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import dateUtil from '../../utils/dateUtil';
import style from './table.module.scss';

function DefaultTableRenderer(props) {
  const { rows, columns, page, rowsPerPage, orderBy } = props;
  return (
    <>
      {rows.map((row, i) => (
        <tr key={row._id}>
          <td>{page * rowsPerPage + i + 1}</td>
          {columns.map(column => {
            return (
              <td
                key={column.id}
                className={orderBy === column.id ? 'orderedBy' : ''}
              >
                {/^\d{13}$/.test(row[column.id])
                  ? dateUtil(row[column.id])
                  : row[column.id]}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: props.columns[0].id,
      page: 0,
      rowsPerPage: 10,
    };
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);

    this.changeRowsPerPage = this.changeRowsPerPage.bind(this);
    this.createHandlerForSort = this.createHandlerForSort.bind(this);
  }

  render() {
    const {
      columns,
      rows,
      className,
      tableRenderer: TableRenderer = DefaultTableRenderer,
    } = this.props;
    const {
      sortRows,
      createHandlerForSort,
      changeRowsPerPage,
      nextPage,
      previousPage,
    } = this;
    const { order, orderBy, page, rowsPerPage } = this.state;
    this.rowsQuantity = rows.length;
    const rowsFrom = page * rowsPerPage;
    const rowsTo = page * rowsPerPage + rowsPerPage;
    const displayedRowsTo =
      rowsTo > this.rowsQuantity ? this.rowsQuantity : rowsTo;
    const displayedRowsFrom =
      rowsFrom === displayedRowsTo ? rowsFrom : rowsFrom + 1;
    const displayedRows = sortRows(rows, orderBy, order).slice(
      rowsFrom,
      rowsTo,
    );

    if (displayedRowsFrom > displayedRowsTo) {
      this.setState({ page: 0 });
    }

    return (
      <div className={className}>
        <table className={`${style.table} table`}>
          <thead>
            <tr>
              <th>No.</th>
              {columns.map(column => (
                <th
                  key={column.id}
                  className={orderBy === column.id ? 'columnOrderedBy' : ''}
                  onClick={createHandlerForSort(column.id)}
                >
                  <div className="d-flex justify-content-end">
                    {column.label}
                    <span>
                      {orderBy === column.id && order === 'desc' ? (
                        <FaCaretUp />
                      ) : (
                        <FaCaretDown />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TableRenderer
              rows={displayedRows}
              columns={columns}
              page={page}
              orderBy={orderBy}
              rowsPerPage={rowsPerPage}
            />
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={columns.length + 1} className={style.footer}>
                <div className="float-right">
                  <span>Rows per page</span>
                  <span>
                    <select onChange={changeRowsPerPage}>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                  </span>
                  <span>
                    {`${displayedRowsFrom}-${displayedRowsTo} of ${this.rowsQuantity}`}
                  </span>
                  <span onClick={previousPage} className={style.navArrow}>
                    <FaAngleLeft />
                  </span>
                  <span onClick={nextPage} className={style.navArrow}>
                    <FaAngleRight />
                  </span>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

  getSorting(order, orderBy) {
    return order === 'desc'
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy);
  }

  changeRowsPerPage(e) {
    this.setState({ rowsPerPage: Number(e.target.value), page: 0 });
  }

  desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  sortRows(rows, orderBy, order) {
    const orderNumber = order === 'asc' ? 1 : -1;

    return rows.sort((a, b) => {
      let res;
      if (typeof a[orderBy] === 'object') {
        if (a[orderBy].props.text < b[orderBy].props.text) {
          res = orderNumber;
        } else {
          res = -orderNumber;
        }
      } else if (a[orderBy] < b[orderBy]) {
        res = orderNumber;
      } else {
        res = -orderNumber;
      }
      return res;
    });
  }

  createHandlerForSort(id) {
    return () => {
      const { orderBy, order } = this.state;
      let newOrder;
      if (orderBy !== id) {
        newOrder = 'asc';
      } else {
        newOrder = order === 'asc' ? 'desc' : 'asc';
      }
      this.setState({
        orderBy: id,
        order: newOrder,
      });
    };
  }

  handleSelectChange(e) {
    const { orderBy } = this.state;
    const { value } = e.target;
    if (value !== orderBy) {
      this.setState({
        order: 'desc',
        orderBy: value,
      });
    }
  }

  handleRequestSort(event, property) {
    const { orderBy, order } = this.state;
    const isDesc = orderBy === property && order === 'desc';
    this.setState({
      order: isDesc ? 'asc' : 'desc',
      orderBy: property,
    });
  }

  changePage(newPage) {
    const { page, rowsPerPage } = this.state;
    let result = newPage;
    if (newPage < 0) result = 0;
    if (newPage > this.rowsQuantity / rowsPerPage) {
      result = Math.floor(this.rowsQuantity / rowsPerPage);
    }
    if (result !== page) {
      this.setState({ page: result });
    }
  }

  nextPage() {
    const { page } = this.state;
    this.changePage(page + 1);
  }

  previousPage() {
    const { page } = this.state;
    this.changePage(page - 1);
  }
}

export default Table;
