import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import auth from '../auth';
import Loading from './Loading';
import { useParams } from 'react-router-dom'
import { pdfjs, Document as Doc, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function MaterialsViewer({ materials }) {
    const { id } = useParams();
    const item = materials.find(item => item.id == id);
    const [linkData, setLinkData] = useState({ loading: true, url: null, failed: false });
    const [numPages, setNumPages] = useState(null);
    const [zoom, setZoom] = useState(800);

    const getLink = async () => {
        const res = await fetch(`/api/view_materials/${id}`, {
            method: 'GET',
            headers: auth.headerTemplate()
        })
        const data = await res.json();
        if (!data.url) {
            setLinkData({
                ...linkData,
                loading: false,
                failed: true
            });
        } else {
            setLinkData({
                ...linkData,
                loading: false,
                url: data.url
            });
        }
    }
    linkData.loading && getLink();

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }
    
    const renderInstructions = () => {
        const ins = item.instructions;
        let steps = [];
        let start = 0;
        let nextStep = 2;
        for (let i = 0; i < ins.length; i++) {
            if (!ins[i].match('.') && ins[i + 1].match('.')) {
                steps.push(<p key={i}>{ins.slice(start, i)}</p>)
                start = i + 1;
            } else if (ins[i] == '.' && ins.slice(i + 1, i + 4) == ` ${nextStep}.` || i == ins.length - 1) {
                steps.push(<p key={i}>{ins.slice(start, i + 1)}</p>)
                start = i + 2;
                nextStep++;
            }
        }
        return steps;
    }

    const toggleInstructions = () => {
        document.querySelector('#instructions-container').classList.toggle('hide-instructions');
    }

    const resize = op => {
        let n = zoom;
        n += op == '+' && n < 1200
            ? 200
            : op == '-' && n > 400 
                ? -200
                : 0
        setZoom(n);
    }

    return linkData.loading
        ? <Loading />
        : linkData.failed ? <h1>You haven't purchased this item.</h1>
        : (
            <Fragment>
                <Doc
                    file={linkData.url}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={zoom}
                            />
                        ),
                    )}
                    <div id="zoom-container">
                        <button
                            id="zoom-out"
                            onClick={resize.bind(this, '-')}
                            disabled={zoom < 600}
                        >
                        </button>
                        <button
                            id="zoom-in"
                            onClick={resize.bind(this, '+')}
                            disabled={zoom > 1000}
                        >
                        </button>
                    </div>
                </Doc>
                <svg id="ins-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    onClick={toggleInstructions}
                >
                    <defs>
                        <filter id="shadow">
                            <feDropShadow
                                dx="1.8"
                                dy="2"
                                stdDeviation="1"
                                floodColor="#777"
                            />
                        </filter>
                    </defs>
                    <path id="ins-path"
                        d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043
                            248 248 248s248-111.003 248-248C504 119.083 392.957 8
                            256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42
                            42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373
                            12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12
                            12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12
                            12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
                    />
                </svg>
                <div id="instructions-container"
                    className="hide-instructions"
                >
                    <h4>Instructions:</h4>
                    <div id="instructions">
                        {renderInstructions()}
                    </div>
                </div>
            </Fragment>
        )
}


// PropTypes
MaterialsViewer.prototypes ={
    materials: PropTypes.array.isRequired
}
