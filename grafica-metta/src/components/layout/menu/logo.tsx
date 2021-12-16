/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'

export default function Logo() {
    return (
        <div className="mb-2 mt-2">
            <>
                <img
                    src="/images/logo.png"
                    alt="My Image"
                    width={120}
                />
            </>
        </div>
    )
}