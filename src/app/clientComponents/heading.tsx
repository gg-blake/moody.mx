"use client"
import styles from '../../../styles/Home.module.css';
import { useEffect, useState } from 'react';

export default function Heading(props: {children: string, className?: string, auraText?: string}) {
    const [particles, setParticles] = useState([]);

    return (
        <span id={`${props.children.split(' ').join('-').toLowerCase()}`} className={`relative text-primary  font-medium text-5xl sm:text-8xl  flex justify-start ${props.className}`}>
            <div className={`${styles.title} z-40 whitespace-nowrap`}>{props.children}</div>
            <div className={`${styles.afterimage1} absolute bottom-0 z-0 whitespace-nowrap`}>{props.children}</div>
            <div className={`${styles.afterimage2} absolute bottom-0 z-0 whitespace-nowrap`}>{props.children}</div>
            <div className={`${styles.afterimage3} absolute bottom-0 z-0 whitespace-nowrap`}>{props.children}</div>
        </span>
    )
}