import { useEffect } from 'react';
import styled from 'styled-components';
import { Loader } from "@googlemaps/js-api-loader";
import Layout from '../components/Layout';
import geoLocations from '../constant/geolocation';
import Images from '../constant/base64Images';

const MapRootDiv = styled.div`
  height: 70vh;
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
    iconUrl: Images.YOSHI_HOUSE,
    iconWidth: 38,
    iconHeight: 31,
  },
  {
    title: 'You Are Here',
    content: "<div style='color:green; font-family: \"Press Start 2P\"'>You Are Here!</div>",
    position: geoLocations.me,
    iconUrl: Images.ME,
    iconWidth: 30,
    iconHeight: 47.8,
  },
  {
    title: 'Ghost House',
    content: "<div style='color:blue; font-family: \"Press Start 2P\"'>Ghost House!</div>",
    position: geoLocations.ghostHouse,
    iconUrl: Images.GHOST_HOUSE,
    iconWidth: 40,
    iconHeight: 48,
  },
  {
    title: 'Castle',
    content: "<div style='color:gray; font-family: \"Press Start 2P\"'>Castle!</div>",
    position: geoLocations.castle,
    iconUrl: Images.CASTLE,
    iconWidth: 40,
    iconHeight: 53,
  },
  // ['Warp Pipe', 34.66739738878135, 135.43225049775214, 'pipe.svg', 38, 42.5],
  // ['Star World', 34.667959023359266, 135.42866400953733, 'star.svg', 38, 38],
  // [
  //   'Donut Plains',
  //   34.66830355359945,
  //   135.4320565322381,
  //   'hill_with_eyes.svg',
  //   50,
  //   60.7,
  // ],
  // [
  //   'Donut Plains',
  //   34.66829411443392,
  //   135.43231361996433,
  //   'hill_with_eyes.svg',
  //   50,
  //   60.7,
  // ],
  // [
  //   'Donut Plains',
  //   34.6683781779677,
  //   135.43217016043528,
  //   'hill_with_eyes.svg',
  //   50,
  //   60.7,
  // ],
];
type enhanceMapOptions = google.maps.MapOptions & { mapId: string };

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
    </Layout>
  );
}

export default IndexPage;
