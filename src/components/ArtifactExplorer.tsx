import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Camera, 
  Eye, 
  Languages, 
  RefreshCw, 
  Download,
  Share2,
  Star,
  Scan,
  FileText,
  Image as ImageIcon,
  Zap,
  Brain,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  Globe,
  Copy,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Filter,
  Search,
  Maximize,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Crop,
  Contrast,
  Sun,
  History,
  Save,
  X
} from 'lucide-react';

// Simulating Tesseract OCR functionality
const mockOCRProcess = (file: File): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text: `རྒྱལ་བའི་གསུང་རབ་ཀྱི་སྙིང་པོ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ།
        
        The Heart of Transcendent Knowledge (Prajnaparamita Hridaya)
        
        Avalokiteshvara Bodhisattva, when practicing deeply the Perfection of Wisdom,
        perceived that all five aggregates in their own-being are empty and was saved from all suffering and distress.
        
        गते गते पारगते पारसंगते बोधि स्वाहा
        
        Original Tibetan text detected with high confidence.
        Sanskrit mantras identified.
        Translation confidence: 92%`,
        confidence: 92,
        detectedLanguages: ['Tibetan', 'Sanskrit', 'English'],
        textBlocks: [
          { text: 'རྒྱལ་བའི་གསུང་རབ་ཀྱི་སྙིང་པོ', language: 'Tibetan', confidence: 95, bbox: [100, 50, 400, 80] },
          { text: 'The Heart of Transcendent Knowledge', language: 'English', confidence: 98, bbox: [100, 120, 500, 150] },
          { text: 'गते गते पारगते', language: 'Sanskrit', confidence: 89, bbox: [150, 350, 350, 380] }
        ],
        metadata: {
          processingTime: '2.3s',
          imageQuality: 'Good',
          textOrientation: 0,
          suggestedImprovements: ['Increase brightness', 'Enhance contrast']
        }
      });
    }, 2300);
  });
};

const ArtifactExplorer: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedTextBlock, setSelectedTextBlock] = useState<any>(null);
  const [translationLanguage, setTranslationLanguage] = useState('english');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleArtifacts = [
    {
      id: 1,
      name: 'Lotus Sutra Manuscript',
      image: '/src/assets/ancient-manuscript.jpg',
      description: 'Ancient Tibetan manuscript from 15th century',
      languages: ['Tibetan', 'Sanskrit'],
      confidence: 94
    },
    {
      id: 2,
      name: 'Prayer Wheel Inscriptions',
      image: '/src/assets/ritual-artifacts.jpg',
      description: 'Golden prayer wheel with carved mantras',
      languages: ['Sanskrit', 'Tibetan'],
      confidence: 87
    },
    {
      id: 3,
      name: 'Stone Tablet',
      image: '/src/assets/historical-photos.jpg',
      description: 'Carved stone inscription from monastery entrance',
      languages: ['Tibetan'],
      confidence: 91
    }
  ];

  const translationOptions = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'hindi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'chinese', name: 'Chinese', flag: '🇨🇳' },
    { code: 'nepali', name: 'Nepali', flag: '🇳🇵' },
    { code: 'spanish', name: 'Spanish', flag: '🇪🇸' },
    { code: 'french', name: 'French', flag: '🇫🇷' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        processOCR(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const processOCR = async (file: File) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setOcrResult(null);

    // Simulate progress
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const result = await mockOCRProcess(file);
      setOcrResult(result);
      setProcessingProgress(100);
    } catch (error) {
      console.error('OCR processing failed:', error);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingProgress(0);
      }, 500);
    }
  };

  const processSampleArtifact = (artifact: any) => {
    setUploadedImage(artifact.image);
    setActiveTab('results');
    
    // Simulate processing
    setIsProcessing(true);
    setTimeout(() => {
      setOcrResult({
        text: `Processed text from ${artifact.name}...\n\nOriginal text detected with ${artifact.confidence}% confidence.\nMultiple languages identified: ${artifact.languages.join(', ')}`,
        confidence: artifact.confidence,
        detectedLanguages: artifact.languages,
        textBlocks: [
          { text: 'Sample text block', language: artifact.languages[0], confidence: artifact.confidence, bbox: [100, 100, 300, 150] }
        ],
        metadata: {
          processingTime: '1.8s',
          imageQuality: 'Excellent',
          textOrientation: 0
        }
      });
      setIsProcessing(false);
    }, 1800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleAudioPlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control text-to-speech
  };

  return (
    <div className="py-12 bg-black/60">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-monastery-gold mb-2">Artifact Explorer with OCR</h1>
          <p className="text-white max-w-2xl mx-auto">
            Upload ancient manuscripts and artifacts to extract and translate text using advanced Tesseract OCR technology
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-lg mx-auto bg-black/60 border border-monastery-gold rounded-xl p-1">
            <TabsTrigger value="upload" className="bg-black text-monastery-gold rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all flex items-center gap-2">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="samples" className="bg-black text-monastery-gold rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all flex items-center gap-2">
              <Star className="w-4 h-4 mr-2" />
              Samples
            </TabsTrigger>
            <TabsTrigger value="results" className="bg-black text-monastery-gold rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all flex items-center gap-2">
              <Eye className="w-4 h-4 mr-2" />
              Results
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <Card className="mb-8 bg-black/40 border-transparent">
              <CardContent className="pt-6">
                <div 
                  className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-monastery-gold">Upload Ancient Manuscript or Artifact</h3>
                  <p className=" mb-4 text-white">
                    Drag and drop an image, or click to browse. Supports JPG, PNG, TIFF, and PDF files.
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Badge variant="outline" className="text-white border-white">
                      <Scan className="w-3 h-3 mr-1" />
                      Tesseract OCR
                    </Badge>
                    <Badge variant="outline" className="text-white border-white">
                      <Languages className="w-3 h-3 mr-1" />
                      Multi-language
                    </Badge>
                    <Badge variant="outline" className="text-white border-white">
                      <Brain className="w-3 h-3 mr-1" />
                      AI-Enhanced
                    </Badge>
                  </div>
                  <Button className ="bg-monastery-gold text-black font-semibold rounded-xl border border-monastery-gold hover:bg-monastery-gold hover:text-black hover:shadow-[0_0_8px_2px_rgba(255,221,51,0.5)] transition-all">
                    <Camera className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Processing Status */}
                {isProcessing && (
                  <div className="mt-6 p-6 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                      <span className="font-medium">Processing with Tesseract OCR...</span>
                    </div>
                    <Progress value={processingProgress} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Analyzing image and extracting text</span>
                      <span>{processingProgress}%</span>
                    </div>
                  </div>
                )}

                {/* OCR Features */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Eye className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Advanced OCR</h3>
                      <p className="text-sm text-slate-600">
                        Tesseract-powered text recognition with support for ancient scripts and degraded documents
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Languages className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Multi-language Support</h3>
                      <p className="text-sm text-slate-600">
                        Recognizes Tibetan, Sanskrit, Chinese, and other historical scripts with high accuracy
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Brain className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">AI Translation</h3>
                      <p className="text-sm text-slate-600">
                        Intelligent translation with cultural context and historical understanding
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sample Artifacts Tab */}
          <TabsContent value="samples">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  Sample Artifacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {sampleArtifacts.map((artifact) => (
                    <Card key={artifact.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <img 
                          src={artifact.image} 
                          alt={artifact.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold mb-2">{artifact.name}</h3>
                        <p className="text-sm text-slate-600 mb-3">{artifact.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {artifact.languages.map((lang) => (
                            <Badge key={lang} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-green-600">
                            {artifact.confidence}% accuracy
                          </Badge>
                          <Button 
                            size="sm"
                            onClick={() => processSampleArtifact(artifact)}
                          >
                            <Scan className="w-4 h-4 mr-2" />
                            Process OCR
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            {uploadedImage && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Image Panel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Original Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded artifact"
                        className="w-full rounded-lg"
                      />
                      
                      {/* Text Block Overlays */}
                      {ocrResult?.textBlocks.map((block: any, index: number) => (
                        <div
                          key={index}
                          className={`absolute border-2 cursor-pointer transition-colors ${
                            selectedTextBlock?.bbox === block.bbox 
                              ? 'border-blue-500 bg-blue-500/20' 
                              : 'border-red-500 bg-red-500/10 hover:bg-red-500/20'
                          }`}
                          style={{
                            left: `${(block.bbox[0] / 600) * 100}%`,
                            top: `${(block.bbox[1] / 400) * 100}%`,
                            width: `${((block.bbox[2] - block.bbox[0]) / 600) * 100}%`,
                            height: `${((block.bbox[3] - block.bbox[1]) / 400) * 100}%`
                          }}
                          onClick={() => setSelectedTextBlock(block)}
                        />
                      ))}
                      
                      {/* Image Tools */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button variant="secondary" size="sm">
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button variant="secondary" size="sm">
                          <Maximize className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Results Panel */}
                <div className="space-y-6">
                  {ocrResult && (
                    <>
                      {/* OCR Status */}
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <div>
                              <h3 className="font-semibold">OCR Processing Complete</h3>
                              <p className="text-sm text-slate-600">
                                Confidence: {ocrResult.confidence}% | 
                                Processing time: {ocrResult.metadata.processingTime}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {ocrResult.detectedLanguages.map((lang: string) => (
                              <Badge key={lang} variant="outline">
                                <Languages className="w-3 h-3 mr-1" />
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Extracted Text */}
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <FileText className="w-5 h-5" />
                              Extracted Text
                            </CardTitle>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(ocrResult.text)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleAudioPlayback}
                              >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
                            {ocrResult.text}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Translation */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Languages className="w-5 h-5" />
                            Translation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-2 mb-4">
                            <select 
                              value={translationLanguage}
                              onChange={(e) => setTranslationLanguage(e.target.value)}
                              className="flex-1 p-2 border rounded-lg"
                            >
                              {translationOptions.map((option) => (
                                <option key={option.code} value={option.code}>
                                  {option.flag} {option.name}
                                </option>
                              ))}
                            </select>
                            <Button>
                              <Brain className="w-4 h-4 mr-2" />
                              Translate
                            </Button>
                          </div>
                          
                          <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-sm text-slate-700 mb-2">
                              <strong>Translated to {translationOptions.find(o => o.code === translationLanguage)?.name}:</strong>
                            </p>
                            <p className="text-sm">
                              The Heart of Perfect Wisdom - This sacred text speaks of the fundamental nature of emptiness and 
                              the path to enlightenment through wisdom. The mantras invoke compassion and understanding...
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Text Blocks Detail */}
                      {selectedTextBlock && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Zap className="w-5 h-5" />
                              Selected Text Block
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <span className="text-sm font-medium text-slate-600">Text:</span>
                                <p className="font-mono bg-slate-50 p-2 rounded text-sm">
                                  {selectedTextBlock.text}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-slate-600">Language:</span>
                                  <p>{selectedTextBlock.language}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-slate-600">Confidence:</span>
                                  <p>{selectedTextBlock.confidence}%</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button className="flex-1">
                          <Save className="w-4 h-4 mr-2" />
                          Save Results
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Export PDF
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </>
                  )}

                  {!ocrResult && !isProcessing && (
                    <Card>
                      <CardContent className="pt-12 pb-12 text-center">
                        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-600">Upload an image to see OCR results</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtifactExplorer;