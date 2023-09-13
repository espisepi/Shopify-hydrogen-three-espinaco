import {Box, OrbitControls, useGLTF} from '@react-three/drei';
import {Canvas, LoaderProto, useLoader} from '@react-three/fiber';
import {useEffect, useState} from 'react';
import {MediaFragment, Media_Model3d_Fragment} from 'storefrontapi.generated';

export function ModelsScene({medias}: {medias: MediaFragment[]}) {
  console.log('MODELSSSSSS SCENE');
  return <ModelScene media={medias[10] as Media_Model3d_Fragment} />;
}

export function ModelScene({media}: {media: Media_Model3d_Fragment}) {
  console.log('ModelScene!!!!!');
  console.log(media);
  const [url] = media.sources
    .filter((source) => source.mimeType.includes('model/gltf-binary'))
    .map((source) => source.url);

  const [isLoading, setIsLoading] = useState(true);
  const [modelBlobUrl, setModelBlobUrl] = useState(null);

  // useEffect(() => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((modelBlob) => {
  //       console.log('OYEEEEEEEEEEEE');
  //       console.log({modelBlob});
  //       // const modelBlobUrl = URL.createObjectURL(modelBlob);
  //       // console.log({modelBlobUrl});
  //       // setImageUrl(dog.message);
  //       // setModelBlobUrl();
  //       setIsLoading(false);
  //     });
  // }, [url]);
  console.log(url);

  // TODO: Hacer que funcione esto
  // const gltf = useGLTF(url);
  //   console.log(gltf);

  return (
    <Canvas>
      <ambientLight />
      <Box material-color="red" />
      <OrbitControls />
    </Canvas>
  );
}

function fetchModel(url: string) {
  // Fetch del video (se hace asi para que funcione en safari)
  fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      // Crear una URL temporal para el blob del video
      const modelBlobUrl = URL.createObjectURL(blob);
    })
    .catch((error) => {
      console.error('Error al cargar el video:', error);
    });
}
