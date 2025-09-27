import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Brain, 
  Send, 
  Mic, 
  MicOff,
  Bot, 
  User, 
  Loader2,
  Sparkles,
  BookOpen,
  Languages,
  History,
  Star,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  Volume2,
  VolumeX,
  Image as ImageIcon,
  FileText,
  Clock,
  Zap,
  Search,
  MessageCircle,
  Lightbulb,
  Globe,
  Calendar,
  MapPin,
  Settings,
  RefreshCw,
  ChevronDown,
  Download,
  Bookmark,
  Eye,
  Play,
  Pause
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'image' | 'analysis';
  metadata?: {
    confidence?: number;
    sources?: string[];
    language?: string;
    audioAvailable?: boolean;
  };
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedMode, setSelectedMode] = useState('general');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const assistantModes = [
    { 
      id: 'general', 
      name: 'General Assistant', 
      icon: Brain, 
      description: 'Ask anything about monasteries and Buddhism',
      color: 'blue' 
    },
    { 
      id: 'manuscript', 
      name: 'Manuscript Analysis', 
      icon: FileText, 
      description: 'Analyze and explain ancient texts',
      color: 'purple' 
    },
    { 
      id: 'translator', 
      name: 'Language Translator', 
      icon: Languages, 
      description: 'Translate between ancient and modern languages',
      color: 'green' 
    },
    { 
      id: 'historian', 
      name: 'Historical Context', 
      icon: Clock, 
      description: 'Provide historical background and context',
      color: 'orange' 
    },
    { 
      id: 'guide', 
      name: 'Spiritual Guide', 
      icon: Star, 
      description: 'Guidance on meditation and spiritual practices',
      color: 'pink' 
    }
  ];

  const quickQuestions = [
    "What is the significance of Om Mani Padme Hum?",
    "Explain the meditation techniques in this manuscript",
    "What does this Tibetan text say?",
    "Tell me about the history of Rumtek Monastery",
    "How should I prepare for meditation?",
    "What are the main Buddhist teachings?",
    "Translate this Sanskrit mantra",
    "Explain the symbolism in this artifact"
  ];

  const sampleConversations = [
    {
      user: "What does this Tibetan text mean: རྒྱལ་བའི་གསུང་རབ་ཀྱི་སྙིང་པོ?",
      assistant: "This Tibetan text reads 'rgyal ba'i gsung rab kyi snying po' which translates to 'The Heart/Essence of the Victor's Teachings' or 'The Heart of the Buddha's Doctrine.' This is likely referring to a fundamental Buddhist text, possibly the Heart Sutra (Prajñāpāramitā Hṛdaya). The term 'rgyal ba' (victor) is an epithet for the Buddha, and 'snying po' means heart or essence, indicating this is about the core teachings of Buddhism.",
      confidence: 94,
      sources: ["Tibetan-English Dictionary", "Buddhist Text Analysis"]
    },
    {
      user: "Tell me about the meditation practices shown in this manuscript",
      assistant: "Based on the manuscript analysis, this appears to describe Shamatha (calm abiding) meditation. The text outlines the traditional nine stages of meditative concentration, starting with placing the mind on the breath and progressing through increasingly stable states of awareness. Key instructions include maintaining gentle attention without forcing, returning to the object when distracted, and developing equanimity. The manuscript also mentions the importance of proper posture and creating a conducive environment for practice.",
      confidence: 91,
      sources: ["Meditation Manuscript Collection", "Traditional Buddhist Texts"]
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(content),
        timestamp: new Date(),
        metadata: {
          confidence: 92,
          sources: ['Buddhist Text Database', 'Historical Archives', 'OCR Analysis'],
          language: 'English',
          audioAvailable: true
        }
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const generateResponse = (query: string): string => {
    const responses = {
      default: `Thank you for your question about "${query}". Based on my analysis of ancient manuscripts and historical texts, I can provide detailed insights. This information is drawn from our extensive collection of digitized Buddhist texts, monastery records, and scholarly translations. Would you like me to elaborate on any specific aspect?`,
      tibetan: `I can see you're asking about Tibetan text. This appears to be classical Tibetan script, likely from a religious manuscript. The text contains traditional Buddhist terminology and follows the grammatical patterns typical of sacred literature from the 15th-17th centuries. The OCR analysis shows high confidence in the character recognition.`,
      meditation: `Meditation practice is central to Buddhist tradition. The techniques described in our manuscripts include mindfulness of breathing (ānāpānasati), loving-kindness meditation (mettā), and analytical meditation on emptiness (śūnyatā). Each practice serves specific purposes in the path to enlightenment and can be adapted for modern practitioners.`,
      history: `The historical context of this period shows significant development in Buddhist philosophy and practice. Monastery records indicate active scholarly exchange between different regions, with manuscripts being copied and translated extensively. This cultural interchange helped preserve and develop Buddhist teachings across the Himalayan region.`
    };

    if (query.includes('Tibetan') || /[\u0F00-\u0FFF]/.test(query)) return responses.tibetan;
    if (query.toLowerCase().includes('meditat')) return responses.meditation;
    if (query.toLowerCase().includes('history')) return responses.history;
    return responses.default;
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real implementation, this would start/stop speech recognition
  };

  const playAudio = (messageId: string) => {
    setIsPlaying(isPlaying === messageId ? null : messageId);
    // In a real implementation, this would play text-to-speech
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">AI Assistant & Manuscript Analysis</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Get intelligent insights about ancient manuscripts, historical context, and Buddhist teachings with AI-powered analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Assistant Modes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assistant Modes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {assistantModes.map((mode) => {
                  const IconComponent = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedMode === mode.id
                          ? `bg-${mode.color}-100 text-${mode.color}-800 border border-${mode.color}-200`
                          : 'hover:bg-slate-50'
                      }`}
                      title={mode.description}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-5 h-5 text-${mode.color}-600`} />
                        <div>
                          <div className="font-medium text-sm">{mode.name}</div>
                          <div className="text-xs text-slate-500">{mode.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickQuestions.slice(0, 4).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className="w-full text-left text-sm p-2 rounded hover:bg-slate-50 transition-colors"
                    >
                      "{question}"
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Manuscripts Analyzed</span>
                  <span className="font-bold text-blue-600">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Languages Supported</span>
                  <span className="font-bold text-green-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Accuracy Rate</span>
                  <span className="font-bold text-purple-600">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Questions Answered</span>
                  <span className="font-bold text-orange-600">8,934</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100">
                        <Bot className="w-5 h-5 text-blue-600" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Monastery AI Assistant</h3>
                      <p className="text-sm text-slate-600">
                        {assistantModes.find(m => m.id === selectedMode)?.name} mode
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI-Powered
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Welcome Message */}
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <Bot className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Welcome to the AI Assistant</h3>
                    <p className="text-slate-600 mb-4">
                      I can help you understand ancient manuscripts, provide historical context, 
                      and answer questions about Buddhist teachings and practices.
                    </p>
                    
                    {/* Sample Conversations */}
                    <div className="space-y-4 max-w-2xl mx-auto">
                      {sampleConversations.map((conv, index) => (
                        <div key={index} className="bg-slate-50 rounded-lg p-4 text-left">
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <User className="w-4 h-4 text-slate-500" />
                              <span className="text-sm font-medium">Example Question:</span>
                            </div>
                            <p className="text-sm text-slate-700">"{conv.user}"</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Bot className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium">AI Response:</span>
                            </div>
                            <p className="text-sm text-slate-700">{conv.assistant.substring(0, 200)}...</p>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {conv.confidence}% confidence
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chat Messages */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar>
                        <AvatarFallback className="bg-blue-100">
                          <Bot className="w-4 h-4 text-blue-600" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-2xl ${message.role === 'user' ? 'order-first' : ''}`}>
                      <div
                        className={`rounded-lg p-4 ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white ml-auto'
                            : 'bg-white border border-slate-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        
                        {message.role === 'assistant' && message.metadata && (
                          <div className="mt-3 pt-3 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span>Confidence: {message.metadata.confidence}%</span>
                                <span>{message.timestamp.toLocaleTimeString()}</span>
                              </div>
                              <div className="flex gap-1">
                                {message.metadata.audioAvailable && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => playAudio(message.id)}
                                  >
                                    {isPlaying === message.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyMessage(message.content)}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <ThumbsUp className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <ThumbsDown className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            
                            {message.metadata.sources && (
                              <div className="flex flex-wrap gap-1">
                                {message.metadata.sources.map((source, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {source}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {message.role === 'user' && (
                      <Avatar>
                        <AvatarFallback className="bg-slate-100">
                          <User className="w-4 h-4 text-slate-600" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {/* Loading Message */}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white border border-slate-200 rounded-lg p-4 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span className="text-sm text-slate-600">Analyzing and generating response...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Ask about manuscripts, history, or Buddhist teachings..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isLoading && inputMessage.trim() && sendMessage(inputMessage.trim())}
                      className="pr-12"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute right-1 top-1 ${isListening ? 'text-red-600' : ''}`}
                      onClick={toggleVoiceInput}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Button
                    onClick={() => inputMessage.trim() && sendMessage(inputMessage.trim())}
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
                
                {/* Quick Action Buttons */}
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    Upload Image
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-3 h-3 mr-1" />
                    Analyze Text
                  </Button>
                  <Button variant="outline" size="sm">
                    <Languages className="w-3 h-3 mr-1" />
                    Translate
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Clear Chat
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;