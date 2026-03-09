"use client"

// Exemplo de como usar ImageOverlay com uma planta/desenho do sítio
// Este é um exemplo de referência - será integrado no componente principal quando tiverem o desenho

/*
Quando tiverem o desenho/planta do sítio:

1. Fazer upload da imagem para /public/images/mapa-sitio-arca.jpg (ou .png)

2. Definir as coordenadas dos 4 cantos da imagem:
   - Canto superior esquerdo: [lat1, lng1]
   - Canto superior direito: [lat2, lng2]
   - Canto inferior esquerdo: [lat3, lng3]
   - Canto inferior direito: [lat4, lng4]

3. Usar ImageOverlay no lugar de TileLayer:

import { ImageOverlay } from "react-leaflet"

<MapContainer>
  <ImageOverlay
    url="/images/mapa-sitio-arca.jpg"
    bounds={[
      [lat_superior_esquerdo, lng_superior_esquerdo],  // Canto superior esquerdo
      [lat_inferior_direito, lng_inferior_direito]      // Canto inferior direito
    ]}
    opacity={1}
  />
  
  {/* Os marcadores continuam funcionando normalmente */}
  {locations.map((location) => (
    <Marker position={[location.lat, location.lng]} />
  ))}
</MapContainer>

4. Os pins (marcadores) funcionam da mesma forma:
   - Cada obra/ponto tem coordenadas GPS reais
   - Os pins aparecem sobre a imagem no local correto
   - Ao clicar, mostra popup com informações
   - Filtros continuam funcionando

EXEMPLO PRÁTICO:

Se a planta tem:
- Entrada principal no topo esquerdo
- Obra "Metamorfose" no centro
- Área de descanso embaixo à direita

Você precisaria:
1. Coordenadas GPS da entrada: [-23.5505, -46.6333]
2. Coordenadas GPS da obra: [-23.5506, -46.6334]
3. Coordenadas GPS da área: [-23.5504, -46.6332]

E definir os bounds da imagem baseado nas coordenadas dos cantos da planta.

*/
