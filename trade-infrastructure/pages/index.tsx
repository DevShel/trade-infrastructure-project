import * as React from 'react'
import Head from 'next/head'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Trade = {
  _id: string
  latency: number
  fromCurrency: string
  toCurrency: string
  amount: number
}

const defaultTradeData: Trade[] = [
  {
    _id: 'LOADING',
    latency: 0,
    fromCurrency: 'LOADING',
    toCurrency: 'LOADING',
    amount: 0,
  },
  {
    _id: 'LOADING',
    latency: 0,
    fromCurrency: 'LOADING',
    toCurrency: 'LOADING',
    amount: 0,
  },
  {
    _id: 'LOADING',
    latency: 0,
    fromCurrency: 'LOADING',
    toCurrency: 'LOADING',
    amount: 0,
  },
  {
    _id: 'LOADING',
    latency: 0,
    fromCurrency: 'LOADING',
    toCurrency: 'LOADING',
    amount: 0,
  },
  {
    _id: 'LOADING',
    latency: 0,
    fromCurrency: 'LOADING',
    toCurrency: 'LOADING',
    amount: 0,
  },
]

const columnHelper = createColumnHelper<Trade>()

const columns = [
  columnHelper.accessor('_id', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('latency', {
    header: () => 'Latency',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),

  columnHelper.accessor(row => row.fromCurrency, {
    id: 'fromCurrency',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>From Currency</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.toCurrency, {
    id: 'toCurrency',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>To Currency</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('amount', {
    header: () => 'Amount',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  
]


export default function Home() {

  const [data, setData] = React.useState(() => [...defaultTradeData])

  const fetchData = async () => {
    const result = await fetch('api/trades');
    result.json().then(json => {
      console.log(json)
      setData(json)
    })
  }
  

  React.useEffect(
    () => {
      setInterval(() => {
        console.log("fetching")
        fetchData()
      }, 5000);
    }, [])




  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })


  return (
    <div className="container">
      <Head>
        <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
        <title>Infrastruct
          ure Monitor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Trading Infrastructure
        </h1>

        <h2> This tool is used to track the latency of "trades" being sent as packets over a network</h2>

        <button className="description">
          Throttle Network Latency
        </button>

        <div className="grid">

        <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
          

          
        </div>
      </main>

      <footer>
        <a
          href="https://www.shel.io/portfolio"

        >
          A Shel.io Creation
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
