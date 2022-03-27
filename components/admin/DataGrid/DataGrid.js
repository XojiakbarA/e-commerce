import { useCallback, useEffect, useState } from "react"
import { LinearProgress, Paper } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useRouter } from "next/router"

const CustomDataGrid = ({ columns, rows, meta, loading }) => {

    const router = useRouter()

    const makeFilterModel = (columnField, columnsType = 'string', value = undefined) => {
        let operatorValue = 'contains'
            switch (columnsType) {
                case 'number':
                    operatorValue = '='
                    break;
                case 'boolean':
                    operatorValue = 'is'
                default:
                    break;
            }
        return { items: [{ columnField, operatorValue, value }] }
    }

    const getInitFilterModel = useCallback(() => {
        let model = makeFilterModel(columns[0].field, columns[0].type)
        columns.forEach(column => {
            const finded = Object.keys(router.query).find(field => field === column.field)
            if (finded) {
                model = makeFilterModel(column.field, column.type, router.query[column.field])
            }
        })
        return model
    }, [columns, router.query])
    const getInitSortModel = useCallback(() => {
        let model = []
        const sort_by = router.query?.sort_by
        if (sort_by) {
            model = [{
                field: sort_by[0],
                sort: sort_by[1]
            }]
        }
        return model
    }, [router.query])

    const INIT_PAGE = 1
    const INIT_PAGE_SIZE = 5

    const [page, setPage] = useState(router.query?.page ?? INIT_PAGE)
    const [ pageSize, setPageSize ] = useState(Number(router.query?.count ?? INIT_PAGE_SIZE))
    const [sortModel, setSortModel] = useState(() => getInitSortModel())
    const [filterModel, setFilterModel] = useState(() => getInitFilterModel())

    useEffect(() => {

        const clearPage = (url, index) => {
            const hasInQuery = url.includes('page', index)
            if (!hasInQuery) {
                setPage(INIT_PAGE)
            }
        }
        const clearPageSize = (url, index) => {
            const hasInQuery = url.includes('count', index)
            if (!hasInQuery) {
                setPageSize(INIT_PAGE_SIZE)
            }
        }
        const clearSortModel = (url, index) => {
            const hasInQuery = url.includes('sort_by', index)
            if (!hasInQuery) {
                setSortModel([])
            }
        }
        const clearFilterModel = (url, index) => {
            const hasInQuery = false
            if (index !== -1) {
                const query = url.slice(index + 1, url.length)
                columns.forEach(column => {
                    if (query.includes(column.field)) {
                        hasInQuery = true
                    }
                })
            }
            if (!hasInQuery) {
                setFilterModel(makeFilterModel(columns[0].field, columns[0].type))
            }
        }

        const clearStates = (url) => {
            const index = url.indexOf('?')
            clearPage(url, index)
            clearPageSize(url, index)
            clearSortModel(url, index)
            clearFilterModel(url, index)
        }

        router.events.on('routeChangeComplete', clearStates)

        return () => {
            router.events.off('routeChangeComplete', clearStates)
        }
    }, [INIT_PAGE, INIT_PAGE_SIZE, columns, router.events])

    const onPageChange = async (nextPage) => {
        await router.push({ query: { ...router.query, page: nextPage + 1 } })
        setPage(nextPage + 1)
    }
    const onPageSizeChange = async (size) => {
        setPage(1)
        await router.push({ query: { ...router.query, page: 1, count: size } })
        setPageSize(size)
    }
    const onSortModelChange = async (model) => {
        const query = { ...router.query }
        delete query.sort_by
        if (model.length) {
            const field = model[0].field
            const sort = model[0].sort
            query.sort_by = [field, sort]
        }
        await router.push({ query: { ...query, page: 1 } })
        setSortModel(model)
    }
    const onFilterModelChange = async (model) => {
        const query = {}
        if (model.items.length) {
            const field = model.items[0].columnField
            const value = model.items[0].value
            if (value) {
                if (typeof value === 'string') {
                    value = value.trim()
                }
                query[field] = value
            }
        }
        setPage(1)
        await router.push({ query })
        setFilterModel(model)
    }

    return (
        <Paper>
            <DataGrid
                autoHeight
                disableColumnMenu
                disableSelectionOnClick
                loading={loading}
                components={{
                    Toolbar: GridToolbar,
                    LoadingOverlay: LinearProgress
                }}
                componentsProps={{
                    filterPanel: {
                        filterFormProps: {
                            operatorInputProps: {
                                sx: { display: 'none' }
                            }
                        }
                    }
                }}
                columns={columns}
                rows={rows}

                rowCount={meta.total}
                rowsPerPageOptions={[5, 10, 15]}

                pagination
                pageSize={pageSize}
                onPageSizeChange={onPageSizeChange}

                paginationMode='server'
                onPageChange={onPageChange}
                page={page - 1}

                sortingMode='server'
                onSortModelChange={onSortModelChange}
                sortModel={sortModel}

                filterMode='server'
                onFilterModelChange={onFilterModelChange}
                filterModel={filterModel}
            />
        </Paper>
    )
}

export default CustomDataGrid