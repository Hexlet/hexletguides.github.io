import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

const Disqus = ({ shortName, config }) => (
    <section className="disqus">
        <DiscussionEmbed shortname={shortName} config={config}/>
        <noscript>
            Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a>
        </noscript>
        <a href="http://disqus.com" className="dsq-brlink">
            comments powered by <span className="logo-disqus">Disqus</span>
        </a>
    </section>
);

export default Disqus;
