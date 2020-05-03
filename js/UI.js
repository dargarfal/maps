class UI {
  constructor() {

    //Instanciando la API
    this.api = new API();

    //Craer los markers con layerGroup
    this.markers = new L.LayerGroup();
    // Iniciar el mapa
    this.mapa = this.inicializarMapa();

  }

  inicializarMapa() {
    // Inicializar y obtener la propiedad del mapa
    const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
    const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + enlaceMapa + ' Contributors',
        maxZoom: 18,
      }).addTo(map);
    return map;

  }

  mostrarEstablecimientos() {
    const contentEstable = this.api.obtenerEstablecimientos()
      .then(data => {
        this.mostrarPines(data.results);
      })
  }

  mostrarPines(establecimientos) {
    //Limpiar los markers
    this.markers.clearLayers();

    establecimientos.forEach(dato => {
      const {
        latitude,
        longitude,
        calle,
        regular,
        premium
      } = dato;

      //Creando Popup
      const opcionesPopUp = L.popup().setContent(`<p> Calle: ${calle}</p>
                                                  <p> <b>Regular:</b> $ ${regular}</p>
                                                  <p> <b> Premium: </b> $ ${premium}</p>
      `);
      //agregar el Pin
      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude)
      ]).bindPopup(opcionesPopUp);

      this.markers.addLayer(marker);
    });

    this.markers.addTo(this.mapa);
  }

  obtenerSugerencias(sugerencia) {
    this.api.obtenerEstablecimientos()
      .then(data => {
        //obtener datos
        const resultados = data.results;
        //Enviar JSON para la busqueda
        this.filtrarSugerencias(resultados, sugerencia);
      })
  }

  filtrarSugerencias(resultado, busqueda) {
    //filtrar con .filter
    const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
    //console.log(filtro);

    this.mostrarPines(filtro);
    //mostrar los pines
  }
}