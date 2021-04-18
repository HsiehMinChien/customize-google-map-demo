import { useEffect } from 'react';
import styled from 'styled-components';
// @ts-ignore
import { Loader } from "@googlemaps/js-api-loader";
import Layout from '../components/Layout';
import geoLocations from '../constant/geolocation';
import images from '../constant/base64Images';
import { enhanceMapOptions } from '../interfaces';

const MapRootDiv = styled.div`
  height: 85vh;
`;
const StyledH1 = styled.h1`
  font-family: 'Press Start 2P';
  text-align: center;
`;
const loader = new Loader({
  apiKey: "AIzaSyC5PwnmMtE8G1RwBREdJTAR1PSijmnuBxQ",
});
const markersData = [
  {
    title: "Yoshi's House",
    content: "<div style='color:red; font-family: \"Press Start 2P\"'>Yoshi\s House!</div>",
    position: geoLocations.yoshisHouse,
    iconUrl: images.YOSHI_HOUSE,
    iconWidth: 38,
    iconHeight: 31,
  },
  {
    title: 'You Are Here',
    content: "<div style='color:green; font-family: \"Press Start 2P\"'>You Are Here!</div>",
    position: geoLocations.me,
    iconUrl: images.ME,
    iconWidth: 30,
    iconHeight: 47.8,
  },
  {
    title: 'Ghost House',
    content: "<div style='color:blue; font-family: \"Press Start 2P\"'>Ghost House!</div>",
    position: geoLocations.ghostHouse,
    iconUrl: images.GHOST_HOUSE,
    iconWidth: 40,
    iconHeight: 48,
  },
  {
    title: 'Castle',
    content: "<div style='color:gray; font-family: \"Press Start 2P\"'>Castle!</div>",
    position: geoLocations.castle,
    iconUrl: images.CASTLE,
    iconWidth: 40,
    iconHeight: 53,
  },
  {
    title: 'Warp Pipe',
    content: "<div style='color:orange; font-family: \"Press Start 2P\"'>Warp Pipe!</div>",
    position: geoLocations.warpPipe,
    iconUrl: images.WRAP_PIPE,
    iconWidth: 38,
    iconHeight: 42.5,
  },
  {
    title: 'Star World',
    content: "<div style='color:purple; font-family: \"Press Start 2P\"'>Star World!</div>",
    position: geoLocations.starWorld,
    iconUrl: images.STAR_WORLD,
    iconWidth: 38,
    iconHeight: 38,
  },
  {
    title: 'Donut Plains',
    content: "<div style='color:DarkCyan; font-family: \"Press Start 2P\"'>Donut Plains!</div>",
    position: geoLocations.donutPlainsOne,
    iconUrl: images.DOUNT_PLAINS,
    iconWidth: 50,
    iconHeight: 60.7,
  },
  {
    title: 'Donut Plains',
    content: "<div style='color:DarkCyan; font-family: \"Press Start 2P\"'>Donut Plains!</div>",
    position: geoLocations.donutPlainsTwo,
    iconUrl: images.DOUNT_PLAINS,
    iconWidth: 50,
    iconHeight: 60.7,
  },
  {
    title: 'Donut Plains',
    content: "<div style='color:DarkCyan; font-family: \"Press Start 2P\"'>Donut Plains!</div>",
    position: geoLocations.donutPlainsThree,
    iconUrl: images.DOUNT_PLAINS,
    iconWidth: 50,
    iconHeight: 60.7,
  },
];

const IndexPage = () => {
  useEffect(() => {
    loader.load().then(() => {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: geoLocations.superNintendoWorld,
          zoom: 18,
          mapId: '7938d5eb683d060b',
        } as enhanceMapOptions,
      );
      markersData.forEach(({ position, title, iconUrl, iconWidth, iconHeight, content }) => {
        const marker = new google.maps.Marker({
          position,
          map,
          title,
          icon: {
            url: iconUrl,
            scaledSize: new google.maps.Size(iconWidth, iconHeight),
          },
          animation: google.maps.Animation.DROP,
        });
        const infoWindows = new google.maps.InfoWindow({ content });
        marker.addListener('click', () => {
          infoWindows.open(map, marker);
        });
      });
    });
  }, []);
  return (
    <Layout title="Customize Google Map">
      <StyledH1>Customize Google Map</StyledH1>
      <MapRootDiv id="map" />
      <audio src="/bgm.mp3" autoPlay loop>
        <p>If you are reading this, it is because your browser does not support the audio element.     </p>
        <embed src="/bgm.mp3" width="180" height="90" />
      </audio>
    </Layout>
  );
}

export default IndexPage;
