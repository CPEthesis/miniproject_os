function Views({ disTerminate, terminateProcess, onFormEvent, process, clock, addProcess, cpuProcess, colStatus, terminate, queue, ioRequest, io, ioProcess, disIO, closeIO, disaddio, disIOControl, avgWaiting, avgTurnaround, disAdd }) {
    return (
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-9">
                    <div className="card border m-2" style={{ height: '350px' }} >
                        <div className="card-header">
                            <nav className="navbar navbar-light bg-light justify-content-between">
                                <h5><p>Shortest Job First (SJF): Preemptive</p></h5>
                                <form className="form-inline" onSubmit={onFormEvent}>
                                    <button className="btn btn-success btn-sm m-1" disabled={disAdd()} onClick={addProcess} id="btnadd">Add Process</button>
                                </form>
                            </nav>
                        </div>
                        <div className="card-body overflow-auto">
                            <table className="table table-sm text-center">
                                <thead>
                                    <tr className="table-primary">
                                        <th>Process</th>
                                        <th>status</th>
                                        <th>Arival Time</th>
                                        <th>Burst Time</th>
                                        <th>Execution Time</th>
                                        <th>Waiting Time</th>
                                        <th>I/O Time</th>
                                        <th>I/O WTime</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {process.map((i) => {
                                        return (
                                            <tr key={i.process}>
                                                <td>process {i.process}</td>
                                                <td id={i.process} style={colStatus(i.status)}>{i.status}</td>
                                                <td>{i.arivaltime}</td>
                                                <td>{i.bursttime}</td>
                                                <td>{i.execution}</td>
                                                <td>{i.waiting}</td>
                                                <td>{i.iotime}</td>
                                                <td>{i.iowtime}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card border m-2" style={{ height: '350px' }}>
                        <div className="card-header"><h5>Ready Queue</h5></div>
                        <div className="card-body overflow-auto">
                            <table className="table table-sm text-center">
                                <thead>
                                    <tr className="table-primary">
                                        <th>Process</th>
                                        <th>Arival Time</th>
                                        <th>Burst Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {queue.map((i) => {
                                        return (
                                            <tr key={i.process}>
                                                <td>process {i.process}</td>
                                                <td>{i.arivaltime}</td>
                                                <td>{i.bursttime}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-6">
                    <div className="card border m-2" style={{ height: '350px' }} >
                        <div className="card-header"><h5><p>Terminate</p></h5>
                        </div>
                        <div className="card-body overflow-auto">
                            <table className="table table-sm text-center">
                                <thead>
                                    <tr className="table-primary">
                                        <th>Process</th>
                                        <th>Arival Time</th>
                                        <th>Execution Time</th>
                                        <th>Waiting Time</th>
                                        <th>Turn Around Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {terminate.map((i) => {
                                        return (
                                            <tr key={i.process}>
                                                <td>process {i.process}</td>
                                                <td>{i.arivaltime}</td>
                                                <td>{i.execution}</td>
                                                <td>{i.waiting}</td>
                                                <td>{i.turnaround}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card border m-2" style={{ height: '350px' }}>
                        <div className="card-header"><h5>I/O Queue</h5></div>
                        <div className="card-body overflow-auto">
                            <table className="table table-sm text-center">
                                <thead>
                                    <tr className="table-primary">
                                        <th>Process</th>
                                        <th>Status</th>
                                        <th><button type="button" className="btn btn-primary btn-sm" disabled={disaddio()} onClick={ioRequest}>Add</button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {io.map((i) => {
                                        return (
                                            <tr key={i.process}>
                                                <td>{i.process}</td>
                                                <td>{i.status}</td>
                                                <td><button type="button" className="btn btn-danger btn-sm" disabled={disIO(i.status)} onClick={closeIO}>close</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card border m-2" style={{ height: '350px' }}>
                        <div className="card-header"><h5>Controller</h5></div>
                        <div className="card-body overflow-hidden">
                            <div className="row">
                                <div className="col-6">
                                    <p>CPU Time</p>
                                </div>
                                <div className="col-6 text-center">
                                    <p>{clock}</p>
                                </div>
                                <div className="col-6">
                                    <p>CPU Process</p>
                                </div>
                                <div className="col-2 text-center">
                                    <p>{cpuProcess}</p>
                                </div>
                                <div className="col-4 text-center">
                                    <p><button type="button" className="btn btn-danger btn-sm" style={{ width: '80px' }}  disabled={disTerminate()} onClick={terminateProcess}>Terminate</button></p>
                                </div>
                                <div className="col-6">
                                    <p>I/O Process</p>
                                </div>
                                <div className="col-6 text-center">
                                    <p>{ioProcess}</p>
                                </div>
                                <div className="col-6">
                                    <p>AVG Turn Around Time</p>
                                </div>
                                <div className="col-6 text-center">
                                    <p>{avgTurnaround()}</p>
                                </div>
                                <div className="col-6">
                                    <p>AVG Waiting Time</p>
                                </div>
                                <div className="col-6 text-center">
                                    <p>{avgWaiting()}</p>
                                </div>
                                <div className="col-6">
                                    <p>RAM</p>
                                </div>
                                <div className="col-6 text-center">
                                    <p>{process.reduce((a, b) => a + b.ram, 0)} MB / 4096 MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Views;
