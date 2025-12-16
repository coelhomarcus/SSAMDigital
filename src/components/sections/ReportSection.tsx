import { useState, useRef, useCallback, useEffect } from "react";
import { FileWarning, CheckCircle, Upload, X, Image, AlertCircle, Clock, MapPin, FileText, Navigation, Crosshair } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Leaflet with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom red marker for the report location
const redMarkerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});



const infractionTypes = [
  { id: "entulho", label: "Obstrução de Calçada (Entulho)", icon: "🚧" },
  { id: "terreno", label: "Descarte em Terreno Baldio", icon: "🏚️" },
  { id: "queimada", label: "Queimada de Resíduos", icon: "🔥" },
  { id: "cacamba", label: "Caçamba Irregular", icon: "🚛" },
  { id: "lixo", label: "Lixo em Via Pública", icon: "🗑️" },
  { id: "outros", label: "Outros!", icon: "📋" },
];

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

interface SubmittedReport {
  protocol: string;
  reference: string;
  type: string;
  description: string;
  images: number;
  date: string;
  coordinates: { lat: number; lng: number };
}

interface LocationMarkerProps {
  position: L.LatLng | null;
  setPosition: (pos: L.LatLng) => void;
}

// Component to handle map clicks and marker placement
const LocationMarker = ({ position, setPosition }: LocationMarkerProps) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} icon={redMarkerIcon} /> : null;
};

// Component to recenter the map
const RecenterButton = ({ position }: { position: L.LatLng | null }) => {
  const map = useMap();
  
  const handleRecenter = () => {
    if (position) {
      map.flyTo(position, 17, { duration: 0.5 });
    }
  };

  if (!position) return null;

  return (
    <button
      type="button"
      onClick={handleRecenter}
      className="absolute top-2 right-2 z-[1000] bg-white p-2 rounded-lg shadow-md hover:bg-slate-50 transition"
      title="Centralizar no marcador"
    >
      <Crosshair size={18} className="text-slate-600" />
    </button>
  );
};

// Component to get user's current location
const LocateButton = ({ setPosition }: { setPosition: (pos: L.LatLng) => void }) => {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);

  const handleLocate = () => {
    setIsLocating(true);
    map.locate({ setView: true, maxZoom: 17 });
  };

  useEffect(() => {
    map.on("locationfound", (e) => {
      setPosition(e.latlng);
      setIsLocating(false);
    });
    map.on("locationerror", () => {
      setIsLocating(false);
    });
  }, [map, setPosition]);

  return (
    <button
      type="button"
      onClick={handleLocate}
      disabled={isLocating}
      className="absolute top-2 left-2 z-[1000] bg-white p-2 rounded-lg shadow-md hover:bg-slate-50 transition flex items-center gap-2"
      title="Usar minha localização"
    >
      <Navigation size={18} className={`text-slate-600 ${isLocating ? "animate-pulse" : ""}`} />
      {isLocating && <span className="text-xs text-slate-500">Localizando...</span>}
    </button>
  );
};

const generateProtocol = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `#MB${year}-${random}`;
};

// Marabá city center coordinates
const MARABA_CENTER: L.LatLngExpression = [-5.3685, -49.1178];
const DEFAULT_ZOOM = 13;

export const ReportSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<SubmittedReport | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reference, setReference] = useState("");
  const [infractionType, setInfractionType] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_FILES = 5;
  const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `Formato não suportado: ${file.name}. Use JPG, PNG ou WEBP.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `Arquivo muito grande: ${file.name}. Máximo 5MB.`;
    }
    return null;
  };

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    if (images.length + fileArray.length > MAX_FILES) {
      setError(`Máximo de ${MAX_FILES} imagens permitidas.`);
      return;
    }

    const newImages: UploadedImage[] = [];
    
    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      newImages.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
      });
    }

    setImages((prev) => [...prev, ...newImages]);
    setError(null);
  }, [images.length]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reference || !infractionType) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!markerPosition) {
      setError("Por favor, marque a localização no mapa.");
      return;
    }

    setIsSubmitting(true);
    
    // Simular envio (delay para demonstração)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const report: SubmittedReport = {
      protocol: generateProtocol(),
      reference,
      type: infractionTypes.find((t) => t.id === infractionType)?.label || infractionType,
      description,
      images: images.length,
      date: new Date().toLocaleString("pt-BR"),
      coordinates: { lat: markerPosition!.lat, lng: markerPosition!.lng },
    };

    setSubmittedReport(report);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);

    setReference("");
    setInfractionType("");
    setDescription("");
    setError(null);
    setSubmitted(false);
    setSubmittedReport(null);
    setMarkerPosition(null);
  };

  if (submitted && submittedReport) {
    return (
      <div className="max-w-2xl mx-auto animate-fadeIn">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-10 text-center">
            <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-white h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Denúncia Registrada com Sucesso!
            </h2>
            <p className="text-green-100">
              Sua ocorrência foi encaminhada ao departamento de fiscalização.
            </p>
          </div>

          {/* Protocol Info */}
          <div className="p-8">
            <div className="bg-slate-50 rounded-lg p-6 mb-6 border border-slate-200">
              <div className="text-center mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Número do Protocolo
                </span>
                <div className="text-3xl font-mono font-bold text-slate-900 mt-1">
                  {submittedReport.protocol}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="text-slate-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-slate-500">Local:</span>
                    <p className="font-medium text-slate-700">
                      {submittedReport.reference}
                    </p>
                    {submittedReport.coordinates && (
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        {submittedReport.coordinates.lat.toFixed(6)}, {submittedReport.coordinates.lng.toFixed(6)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="text-slate-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-slate-500">Tipo:</span>
                    <p className="font-medium text-slate-700">{submittedReport.type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="text-slate-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-slate-500">Data/Hora:</span>
                    <p className="font-medium text-slate-700">{submittedReport.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Image className="text-slate-400 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-slate-500">Imagens anexadas:</span>
                    <p className="font-medium text-slate-700">
                      {submittedReport.images} {submittedReport.images === 1 ? "arquivo" : "arquivos"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini map showing the reported location */}
            {submittedReport.coordinates && (
              <div className="mb-6 rounded-lg overflow-hidden border border-slate-200 h-48">
                <MapContainer
                  center={[submittedReport.coordinates.lat, submittedReport.coordinates.lng]}
                  zoom={16}
                  style={{ height: "100%", width: "100%" }}
                  zoomControl={false}
                  dragging={false}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker 
                    position={[submittedReport.coordinates.lat, submittedReport.coordinates.lng]} 
                    icon={redMarkerIcon}
                  />
                </MapContainer>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                <div className="text-sm">
                  <p className="font-semibold text-amber-800">Guarde o número do protocolo!</p>
                  <p className="text-amber-700 mt-1">
                    Use-o para acompanhar o andamento da sua denúncia. 
                    O prazo estimado para análise é de 5 a 10 dias úteis.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={resetForm}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-sm transition"
              >
                Registrar Nova Ocorrência
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-lg transition"
              >
                Imprimir Comprovante
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-rose-600 px-8 py-6 flex items-start gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
            <FileWarning className="text-white" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Canal de Denúncia
            </h2>
            <p className="text-red-100 text-sm mt-1">
              Reporte irregularidades ambientais de forma anônima e segura.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
              <div className="text-sm text-red-700">{error}</div>
              <button
                type="button"
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Map Section */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Localização no Mapa <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-slate-500 mb-3">
              Clique no mapa para marcar o local da ocorrência ou use o botão de localização.
            </p>
            <div className="relative rounded-lg overflow-hidden border-2 border-slate-200 hover:border-slate-300 transition">
              <MapContainer
                center={MARABA_CENTER}
                zoom={DEFAULT_ZOOM}
                style={{ height: "300px", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={markerPosition} setPosition={setMarkerPosition} />
                <LocateButton setPosition={setMarkerPosition} />
                <RecenterButton position={markerPosition} />
              </MapContainer>
            </div>
            {markerPosition && (
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-slate-500 font-mono">
                  📍 Coordenadas: {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}
                </p>
                <button
                  type="button"
                  onClick={() => setMarkerPosition(null)}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Limpar marcador
                </button>
              </div>
            )}
          </div>

          {/* Reference Field */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Ponto de Referência <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Ex: Próximo ao supermercado, em frente à escola..."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none text-slate-700 transition"
            />
          </div>

          {/* Infraction Type */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
              Natureza da Infração <span className="text-red-500">*</span>
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {infractionTypes.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                    infractionType === item.id
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={item.id}
                    checked={infractionType === item.id}
                    onChange={(e) => setInfractionType(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-xl">{item.icon}</span>
                  <span className={`text-sm font-medium ${
                    infractionType === item.id ? "text-red-700" : "text-slate-700"
                  }`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Descrição da Ocorrência
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Descreva detalhes adicionais sobre a irregularidade observada..."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none text-slate-700 transition resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Evidência Fotográfica
              <span className="text-slate-400 font-normal ml-2">
                (Máximo {MAX_FILES} imagens)
              </span>
            </label>
            
            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                isDragging
                  ? "border-red-500 bg-red-50"
                  : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
              } ${images.length >= MAX_FILES ? "opacity-50 pointer-events-none" : ""}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                disabled={images.length >= MAX_FILES}
              />
              <Upload
                className={`mx-auto mb-3 ${
                  isDragging ? "text-red-500" : "text-slate-400"
                }`}
                size={40}
              />
              <p className={`text-sm font-medium ${
                isDragging ? "text-red-600" : "text-slate-600"
              }`}>
                {isDragging
                  ? "Solte as imagens aqui..."
                  : "Arraste imagens ou clique para selecionar"}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                JPG, PNG ou WEBP • Máximo 5MB por arquivo
              </p>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100"
                  >
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition">
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600 shadow-lg"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-white text-xs truncate">
                        {image.file.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <p className="text-xs text-slate-500">
              <span className="text-red-500">*</span> Campos obrigatórios
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-3 px-10 rounded-lg shadow-sm transition flex items-center justify-center gap-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Denúncia"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
