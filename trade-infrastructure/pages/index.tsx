import * as React from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';

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
    latency: NaN,
    fromCurrency: 'LOADING',
    toCurrency: 'LOADING',
    amount: NaN,
  },
  {
    _id: 'LOADING',
    latency: NaN,
    fromCurrency: 'LOADING',
    toCurrency: 'LOADING',
    amount: NaN,
  },
  {
    _id: 'LOADING',
    latency: NaN,
    fromCurrency: 'LOADING',
    toCurrency: 'LOADING',
    amount: NaN,
  },
  {
    _id: 'LOADING',
    latency: NaN,
    fromCurrency: 'LOADING',
    toCurrency: 'LOADING',
    amount: NaN,
  },
  {
    _id: 'LOADING',
    latency: NaN,
    fromCurrency: 'LOADING',
    toCurrency: 'LOADING',
    amount: NaN,
  },
]

const columnHelper = createColumnHelper<Trade>()

const columns = [
  columnHelper.accessor('_id', {
    cell: info => info.getValue(),
    header: () => <span>MongoDB ID</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('latency', {
    header: () => 'Latency (ms)',
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
  const [recordingText, setRecordingText] = React.useState(() => "Loading")
  const [recordingStatus, setRecordingStatus] = React.useState(() => "Loading")
  const [data, setData] = React.useState(() => [...defaultTradeData])
  const [averageLatency, setAverageLatency] = React.useState(() => [NaN])


  const getRecordingStatus = async () => {
    const result = await fetch('api/recordingStatus');
    result.json().then(json => {
      console.log("Current Status:", json[0].status)
      setRecordingStatus(json[0].status);
      if (json[0].status == "recording"){
        setRecordingText("Stop recording")
      } else if (json[0].status == "normal"){
        setRecordingText("Start recording")
      }
      
    })
    
  }

  function getAverageLatency(fiftyTradesObj: any) {
    let sum = 0;
    for (var i = 0; i < fiftyTradesObj.length; i++){
      sum += fiftyTradesObj[i]['latency'];
    }
    return (sum/fiftyTradesObj.length).toFixed(3)
  }

  const fiftyTrades = async () => {
    const result = await fetch('api/fiftyTrades');
    result.json().then(json => {
      console.log(json)
      setData(json.slice(0,5))
      setAverageLatency(getAverageLatency(json))
    })
  }
  

  React.useEffect(
    () => {
      setInterval(() => {
        console.log("Fetching trades and recording status")
        fiftyTrades()
        getRecordingStatus()
      }, 2000);
    }, [])


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })



  async function recordTrades(){
    console.log("Recording started")
    // Dummy try catch to signal to port 8080 that we are recording
    try{
      const response = await fetch("http://localhost:8080");
    } catch{
    }
  }

  return (
    <div className="container">
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <title>Infrastructure Monitor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        {/* Container encapsulating 3 main rows */}
        <div className="container align-items-center justify-content-center "> 

          {/* Header Text Row */}
          <div className="row ">
            <h2 className="title">
              Trading Infrastructure Monitor
            </h2>
          </div>
          {/* Average Row */}
          <div className="row align-items-center justify-content-center  my-3">
            
            
            <div className="col-8 text-center">
              This tool was created to track the network latency when sending trading information between two docker containers
            </div>
            
            
          </div>
          
          

          {/* Column and Data Row */}
          <div className="row my-3">
            <div className="row">
                <div className="col">
                  <table className="table table-striped">
                    <thead className="thead-dark">
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
                <div className="col px-5">
                <div className = "row justify-content-center mt-3">
                  <div className = "col">
                    <button onClick={() => recordTrades()} className="btn btn-danger "> {recordingText} </button>
                  </div>
                  <div className = "col">
                    <p> Current status: {recordingStatus}</p>
                  </div>
            </div>
                  <div className="row mt-3 pt-3 border-top border-dark">
                    <h2> Average latency over last 50 trades: </h2>
                    <h2> {averageLatency} ms </h2>
                  </div>
                  
                </div>
              
              </div>
          </div>
        
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
          min-height: 75vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
        }

        main {
          padding: 3rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
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

        .title{
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
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
