import { useState, useEffect } from "react";
import Views from './Views'
let countProcess = 0;
let index = 0;
const Controller = () => {
    const [process, setProcess] = useState([])
    const [queue, setQueue] = useState([])
    const [terminate, setTerminate] = useState([])
    const [clock, setClock] = useState(0)
    const [io, setIo] = useState([])
    const [cpuProcess, setCpuProcess] = useState(null)
    const [ioProcess, setIoProcess] = useState(null);
    const generateNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const addProcess = () => {
        countProcess++;
        let p = [...process]
        let ran = generateNumber(5, 30);
        let ram = generateNumber(150, 500);
        p.push({ process: countProcess, arivaltime: clock, bursttime: ran, waiting: 0, turnaround: null, status: 'New', iotime: 0, iowtime: 0, ram: ram, execution: 0 })
        setTimeout(()=>{
            setProcess(p)
        },300)
    }
    const disAdd = () => {
        let ram = process.reduce((a, b) => a + b.ram, 0)
        if (ram <= 4096 - 500) {
            if (document.getElementById("btnadd") !== null)
                document.getElementById("btnadd").innerHTML = "Add Process"
            return false;
        } else {
            if (document.getElementById("btnadd") !== null)
                document.getElementById("btnadd").innerHTML = "Out of Memory"
            return true;
        }
    }

    function onFormEvent(event) {
        event.preventDefault();
    }
    const colStatus = (value) => {
        if (value === 'New') {
            const mystyle = {
                backgroundColor: '#D1EAF5'
            }
            return mystyle;
        }
        else if (value === 'Waiting') {
            const mystyle = {
                backgroundColor: '#F9EEB6'
            }
            return mystyle;
        }
        else if (value === 'Terminate') {
            const mystyle = {
                backgroundColor: '#FFB7B7'
            }
            return mystyle;
        }
        else if (value === 'Running') {
            const mystyle = {
                backgroundColor: '#BBE2D7'
            }
            return mystyle;
        }
    }
    const ioRequest = () => {
        let p = [...process];
        let io1 = [...io];
        p[index].status = 'Waiting';
        io1.push({ process: p[index].process, status: null });
        setIo(io1);
        setProcess(p);
    }
    const disIO = (status) => {
        if (status === 'Running')
            return false;
        else
            return true;
    }
    const closeIO = () => {
        let p = [...process];
        let io1 = io;
        let i = p.findIndex((i) => i.process === io[0].process)
        p[i].status = 'Ready';
        io1.shift()
        setIo(io1);
        setProcess(p);
    }
    const disaddio = () => {
        let p = process.filter((i) => i.status !== 'Waiting');
        if (p.length !== 0)
            return false;
        else
            return true;
    }
    const disIOControl = (io) => {
        if (io === null)
            return true;
        else
            return false
    }
    const avgWaiting = () => {
        if (terminate.length !== 0) {
            let sum = 0;
            for (let i = 0; i < terminate.length; i++) {
                sum += terminate[i].waiting
            }
            sum = sum / terminate.length;
            return sum.toFixed(2);
        } else
            return null;
    }
    const avgTurnaround = () => {
        if (terminate.length !== 0) {
            let sum = 0;
            for (let i = 0; i < terminate.length; i++) {
                sum += terminate[i].turnaround
            }
            sum = sum / terminate.length;
            return sum.toFixed(2);
        } else
            return null;
    }
    const terminateProcess = () => {
        let p = [...process];
        p[index].status = 'Terminate';
        p[index].turnaround = p[index].execution + p[index].waiting;
        let t = [...terminate];
        t.push(p[index])
        setTerminate(t);
        setProcess(p);
        setCpuProcess(null)
    }
    const disTerminate=() =>{
        let pro = process.filter((i) => i.status === 'Running')
        if(pro.length !== 0)
            return false
        else
            return true;
    }
    useEffect(() => {
        const pro = () => {
            if (process.length !== 0) {
                let p = process.filter((i) => i.status !== 'Terminate')
                if (p.length !== 0) {
                    let min = 0;
                    let check = false;
                    min = ~min;
                    min = min >>> 1;
                    for (let i = 0; i < p.length; i++) {
                        if (p[i].arivaltime <= clock && p[i].bursttime < min && p[i].bursttime > 0 && p[i].status !== 'Waiting') {
                            min = p[i].bursttime;
                            index = i;
                            check = true;
                        }
                    }
                    if (check !== false) {
                        for (let j = 0; j < p.length; j++) {
                            if (j === index) {
                                p[index].status = 'Running';
                                p[index].bursttime--;
                                p[index].execution++;
                            }
                            else if (j !== index && p[j].status !== 'Waiting') {
                                p[j].status = 'Ready';
                                p[j].waiting += 1;
                            }
                        }
                        setCpuProcess(p[index].process)
                        if (p[index].bursttime === 0) {
                            p[index].status = 'Terminate';
                            p[index].turnaround = p[index].execution + p[index].waiting;
                            let t = [...terminate];
                            t.push(p[index])
                            setTerminate(t);
                            setCpuProcess(null)
                        }
                    }else{
                        setCpuProcess(null)
                    }
                    if (io.length !== 0) {
                        let io1 = [...io];
                        for (let k = 0; k < io.length; k++) {
                            if (k === 0) {
                                let i = p.findIndex((i) => i.process === io[k].process)
                                io1[k].status = 'Running'
                                p[i].iotime++;
                            } else {
                                let i = p.findIndex((i) => i.process === io[k].process)
                                io1[k].status = 'Waiting'
                                p[i].iowtime++;
                            }
                        }
                        setIo(io1)
                        setIoProcess(io1[0].process)
                    } else
                        setIoProcess(null)

                    let q = p.filter((i) => i.status === 'Ready');
                    q.sort(function (a, b) { return a.bursttime - b.bursttime });
                    setQueue(q)
                    setProcess(p)

                } else {
                    setProcess([])
                    setQueue([])
                    index = null
                }
            }
        }
        pro()
    }, [clock])
    setTimeout(() => {
        setClock(clock + 1);
    }, 1000);
    return (
        <div>
            <Views
                process={process}
                onFormEvent={onFormEvent}
                addProcess={addProcess}
                clock={clock}
                colStatus={colStatus}
                cpuProcess={cpuProcess}
                terminate={terminate}
                queue={queue}
                ioRequest={ioRequest}
                io={io}
                ioProcess={ioProcess}
                disIO={disIO}
                closeIO={closeIO}
                disaddio={disaddio}
                disIOControl={disIOControl}
                avgWaiting={avgWaiting}
                avgTurnaround={avgTurnaround}
                disAdd={disAdd}
                terminateProcess={terminateProcess}
                disTerminate={disTerminate}
            />
        </div>
    );
}
export default Controller;