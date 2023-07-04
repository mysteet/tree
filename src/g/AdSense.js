import {useEffect} from 'react';

const AdSenseScript = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <script
            data-ad-client="ca-pub-6643054555561527"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
    );
};

export default AdSenseScript;
