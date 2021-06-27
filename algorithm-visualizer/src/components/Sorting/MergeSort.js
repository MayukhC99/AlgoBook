import { useState, useEffect } from 'react'
import './sort.css';
import './myStyle.css';

var bubblectr = 0;
var sorted = false;
var width = 50;
var reset = true;
var color1 = 'rgb(0, 204, 0)';
var timeouts = []
var skip = false;

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function MergeSort() {

    const [ar, setAr] = useState([])
    const [n, setN] = useState(20)
    const [delay, setDelay] = useState(250)

    useEffect(() => {
        changeArrSize();
        reset = true;
        sorted = false;
        document.getElementById('skip').disabled = true;
    }, [])

    useEffect(() => {
        if (skip === true) {
            for (let i = 0; i < n; i++) {
                const arr_bar = document.getElementsByClassName('array-bar');
                arr_bar[i].style.backgroundColor = 'blue';
            }
        }
    }, [n])

    useEffect(() => {
        resetArray();
        const arr_bar = document.getElementsByClassName('array-bar');
        if (typeof arr_bar === 'undefined') {
            for (let i = 0; i < n; i++) {
                arr_bar[i].style.backgroundColor = 'blue';
            }
        }
    }, [n])

    useEffect(() => {
        if (sorted === true) {
            let arr = ar;
            arr.sort(function (a, b) { return a - b });
            setAr(arr)
        }
        for (let i = 0; i < n; i++) {
            const arr_bar = document.getElementsByClassName('array-bar');
            arr_bar[i].style.backgroundColor = 'blue';
        }
    }, [delay])

    const resetCSS = () => {
        let arr = ar;
        arr.sort(function (a, b) { return a - b });
        setAr(arr)
        for (let i = 0; i < n; i++) {
            const arr_bar = document.getElementsByClassName('array-bar');
            arr_bar[i].style.backgroundColor = 'blue';
        }
    }

    const buttons = (x, dly) => {
        document.getElementById('reset').disabled = x;
        document.getElementById('selectionsort').disabled = x;
        document.getElementById('bubblesort').disabled = x;
        document.getElementById('insertionsort').disabled = x;
        document.getElementById('mergesort').disabled = x;
        document.getElementById('quicksort').disabled = x;
        document.getElementById('arr_size').disabled = x;
        document.getElementById('delay').disabled = x;
        document.getElementById('skip').disabled = !x;
        const arr_bar = document.getElementsByClassName('array-bar');
        if (x === true) {
            for (let i = 0; i < n; i++) {
                arr_bar[i].style.transform = 'translateX(0px)';
                arr_bar[i].style.backgroundColor = 'blue';
            }
        }
        else {
            setTimeout(() => {
                for (let i = 0; i < n; i++) {
                    arr_bar[i].style.backgroundColor = 'blue';
                }
            }, 1000);
        }
        sorted = !x;
    }

    const mergeSortAnimations = (arr) => {
        const animation = []
        if (arr.length === 1)
            return animation
        mergeSort1(arr, 0, arr.length - 1, animation)
        return animation
    }
    const mergeSort1 = (arr, l, r, animation) => {
        if (l < r) {
            let mid = Math.floor((l + r) / 2)
            mergeSort1(arr, l, mid, animation)
            mergeSort1(arr, mid + 1, r, animation)
            merge(arr, l, r, mid, animation)
        }
    }

    const merge = (arr, l, r, mid, animation) => {
        let i = l, j = mid + 1, k = l
        let i1 = l, j1 = mid + 1
        while (i1 <= mid && j1 <= r) {
            animation.push({
                i: i,
                j: j,
                color: 'palegreen'
            })
            if (arr[i] <= arr[j]) {
                animation.push({
                    i: i,
                    j: j,
                    color: 'blue'
                })
                i++
                k++
                i1++
            }
            else {
                animation.push({
                    i: k,
                    j: j,
                    color: 'swap'
                })
                animation.push({
                    i: k,
                    j: j,
                    color: 'blue'
                })
                let tmp = arr[j]
                for (let z = j; z > i; z--) {
                    arr[z] = arr[z - 1]
                }
                arr[i] = tmp
                i++
                j++
                j1++
                k++;
            }
        }
        while (i <= mid) {
            animation.push({
                i: i,
                j: -1,
                color: 'palegreen'
            })
            animation.push({
                i: i,
                j: -1,
                color: 'blue'
            })
            i++;
        }
        while (j <= r) {
            animation.push({
                i: j,
                j: -1,
                color: 'palegreen'
            })
            animation.push({
                i: j,
                j: -1,
                color: 'blue'
            })
            j++;
        }
    }
    const mergeSort = () => {
        timeouts = []
        if (reset === false)
            resetCSS();
        buttons(true, 0);
        let animations = mergeSortAnimations(ar);
        let ptr = [];
        let previdx = -1;
        for (let i = 0; i < ar.length; i++)
            ptr[i] = {
                i: i,
                ctr: 0
            };
        let len = animations.length;
        let arr_bar = document.getElementsByClassName('array-bar');
        for (let i = 0; i < len; i++) {
            let idx1 = animations[i].i;
            let idx2 = animations[i].j;
            if (idx2 === -1) {
                let qq = setTimeout(() => {
                    arr_bar[ptr[idx1].i].style.backgroundColor = animations[i].color
                }, i * delay);
                timeouts.push(qq);
            }
            else if (animations[i].color === 'swap') {
                let qq = setTimeout(() => {
                    for (let pq = idx1; pq < idx2; pq++) {
                        ptr[pq].ctr += 1
                        let y = ptr[pq].ctr * (width + 2);
                        arr_bar[ptr[pq].i].style.transform = `translateX(${y}px)`
                    }
                    ptr[idx2].ctr -= idx2 - idx1;
                    let y = ptr[idx2].ctr * (width + 2);
                    arr_bar[ptr[idx2].i].style.transform = `translateX(${y}px)`
                    let pqq = ptr[idx2]
                    for (let pq = idx2 - 1; pq >= idx1; pq--)
                        ptr[pq + 1] = ptr[pq];
                    ptr[idx1] = pqq
                    for (let it = 0; it < n; it++)
                        if (arr_bar[it].style.backgroundColor === 'palegreen')
                            arr_bar[it].style.backgroundColor = 'blue'
                }, i * delay);
                timeouts.push(qq);
            }
            else {
                let qq = setTimeout(() => {
                    arr_bar[ptr[idx1].i].style.backgroundColor = animations[i].color
                    arr_bar[ptr[idx2].i].style.backgroundColor = animations[i].color
                }, i * delay);
                timeouts.push(qq);
            }
        }
        let qq = setTimeout(() => {
            for (let it = 0; it < n; it++)
                arr_bar[it].style.backgroundColor = color1
        }, animations.length * delay);
        timeouts.push(qq);
        qq = setTimeout(() => {
            buttons(false, (animations.length) * delay);
            reset = false;
        }, (animations.length + 1) * delay);
        timeouts.push(qq);
    }

    const resetArray = () => {
        reset = true;
        sorted = false;

        let array = [];
        for (let i = 0; i < n; i++) {
            array.push(randomIntFromInterval(5, 480));
        }
        array[randomIntFromInterval(0, n - 1)] = 480
        setAr(array)
        if (bubblectr === 1)
            for (let i = 0; i < n; i++) {
                const arr_bar = document.getElementsByClassName('array-bar');
                arr_bar[i].style.transform = 'translateX(0px)';
                arr_bar[i].style.backgroundColor = 'blue';
            }
        bubblectr = 1;
    }

    const skipAnimations = () => {
        skip = true;
        for (let i = 0; i < timeouts.length; i++)
            window.clearTimeout(timeouts[i]);
        const arr_bar = document.getElementsByClassName('array-bar');
        for (let i = 0; i < n; i++) {
            arr_bar[i].style.transform = 'translateX(0px)';
            arr_bar[i].style.backgroundColor = color1;
        }
        let arr = ar;
        arr.sort(function (a, b) { return a - b });
        setAr(arr)
        buttons(false, 800);
        timeouts = [];
        skip = false;
    }

    const changeArrSize = () => {
        var x = document.getElementById('arr_size');
        bubblectr = 0;
        let wdth = .8 * window.innerWidth;
        let n1 = Math.floor(x.value * 3.6);
        //doubt about width formula
        width = Math.floor(wdth / n1) - 2;
        setN(n1)
    }

    const changeDelay = () => {
        let x = document.getElementById('delay');
        let val;
        if (x.value >= 1450)
            val = .05;
        else if (x.value >= 1350)
            val = .1;
        else if (x.value >= 1250)
            val = .25;
        else if (x.value >= 1150)
            val = .5;
        else if (x.value > 1000)
            val = .75;
        else val = 1001 - x.value;
        setDelay(val)
    }

    let i;
    for (i = 1000; i >= 0; i--) {
        let wdth = .8 * window.innerWidth;
        let n1 = Math.floor(i * 3.6);
        let width1 = Math.floor(wdth / n1) - 2;
        if (width1 > 0)
            break;
    }
    let maxn = i;
    let str, dly = delay, strdly;
    if (dly === .5)
        strdly = '0.50'
    else if (dly === .1)
        strdly = '0.10'
    else if (dly >= 1 && dly <= 9)
        strdly = '00' + dly.toString()
    else if (dly >= 10 && dly <= 99)
        strdly = '0' + dly.toString()
    else strdly = dly.toString()
    if (dly === 1000)
        strdly += 'ms delay'
    else strdly += ' ms delay'
    let ctr1 = 0;
    if (reset === false) {
        str = ar.map((x) => (
            <div className="array-bar" key={ctr1++ + 'e'} style={{ backgroundColor: 'blue', height: `${x}px`, width: `${width}px` }}> </div>
        ))
    }
    else {
        str = ar.map((x) => (
            <div className="array-bar" key={ctr1++ + 'w'} style={{ backgroundColor: 'blue', height: `${x}px`, width: `${width}px`, transform: 'translateX(0px)', transition: `transform ${delay}ms linear,height 0.1s linear` }}> </div>
        ))
    }

    return (
        <center>
            <h1 className="mainHeading" style={{ color: 'black' }}>Merge Sort Visualizer</h1>
            <div className="row" style={{ width: '95%', borderTop: '5px' }}>
                <div className="col-md-6 box">
                    <button className="button button4" onClick={mergeSort} id='mergesort'>Merge Sort</button>
                    <button className="button button4" onClick={resetArray} id='reset'>Reset Values</button>
                    <button className="button button4" onClick={skipAnimations} id='skip'>Skip</button>
                </div>
                <div className="col-md-3 box">
                    <div>
                        <span style={{ fontFamily: 'Georgia', cursor: 'default' }}><b>No. of bars </b></span>
                        <input type="range" min={2} max={maxn} defaultValue={4} onChange={changeArrSize} className="slider" id="arr_size" />
                        <span style={{ backgroundColor: 'rgb(212, 210, 231)', color: 'black', borderRadius: '4px', cursor: 'default' }}> {n}&nbsp;
                        </span>
                    </div>
                </div>
                <div className="col-md-3 box">
                    <span style={{ fontFamily: 'Georgia', cursor: 'default' }}><b> Speed </b></span>
                    <input type="range" min={1} max={1505} defaultValue={751} onChange={changeDelay} className="slider" id="delay" />
                    <span style={{ backgroundColor: 'rgb(212, 210, 231)', color: 'black', borderRadius: '4px', cursor: 'default', float: '' }}> {strdly}&nbsp;</span>
                </div>
                <div className="box array-container" style={{ border: '1px solid #ccc', paddingTop: '2%', paddingBottom: '1%', backgroundColor: '#fafafa' }}>

                    {str}
                    <div className="array-bar" style={{ backgroundColor: '#f2f2f2', height: `480px`, width: `0.1px` }}> </div>
                </div>
            </div>
        </center>
    )
}
