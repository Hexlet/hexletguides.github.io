import React from 'react';

class Feed extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(
      `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:yandex="http://news.yandex.ru"
         xmlns:media="http://search.yahoo.com/mrss/"
         xmlns:turbo="http://turbo.yandex.ru"
         version="2.0">
        <channel>
            <title>Hexlet Guides</title>
            <link>http://localhost:3000/</link>
            <description>Полезные статьи и гайды для разработчиков</description>
            <language>ru</language>
            <!-- <turbo:analytics></turbo:analytics> -->
            <!-- <turbo:adNetwork></turbo:adNetwork> -->
            <item turbo="true">
                <turbo:extendedHtml>true</turbo:extendedHtml>
                <link>http://localhost:3000/makefile-as-task-runner/</link>
                <!-- <turbo:source></turbo:source> -->
                <!-- <turbo:topic>What Is a Makefile and How to Use It</turbo:topic> -->
                <title>What Is a Makefile and How to Use It</title>
                <pubDate>Fri, 10 Jun 2022 00:00:00 +0000</pubDate>
                <author>Kirill Mokevnin</author>
                <!-- <yandex:related></yandex:related> -->
                <turbo:content>
                <![CDATA[
                  <div data-block="breadcrumblist">
                    <a href="http://localhost:3000/">Hexlet Guides</a>
                    <a href="http://localhost:3000/makefile-as-task-runner/">What Is a Makefile and How to Use It</a>
                  </div>
                  <button
                    formaction="http://localhost:3000/makefile-as-task-runner/"
                    data-background-color="#eee"
                    data-color="dark"
                    data-turbo="false"
                    data-primary="false"
                  >
                    Читать полную версию на сайте
                  </button>
                ]]>
                </turbo:content>
            </item>
        </channel>
    </rss>`,
    );
    res.end();
  }
}

export default Feed;
