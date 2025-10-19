import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [selectedCity, setSelectedCity] = useState('');
  const [eventType, setEventType] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [showOutfit, setShowOutfit] = useState(false);
  const [showStyleAnalysis, setShowStyleAnalysis] = useState(false);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [favoriteTips, setFavoriteTips] = useState<number[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);
  const [showMoreOutfits, setShowMoreOutfits] = useState(false);
  const [weatherData, setWeatherData] = useState<{ temp: number; condition: string } | null>(null);

  const cities = [
    'Москва',
    'Санкт-Петербург',
    'Новосибирск',
    'Екатеринбург',
    'Казань',
    'Нижний Новгород',
    'Томск',
    'Сочи',
    'Владивосток'
  ];

  const eventTypes = [
    { value: 'office', label: 'Офис', icon: 'Briefcase' },
    { value: 'party', label: 'Вечеринка', icon: 'PartyPopper' },
    { value: 'date', label: 'Свидание', icon: 'Heart' },
    { value: 'sport', label: 'Спорт', icon: 'Dumbbell' },
    { value: 'casual', label: 'Прогулка', icon: 'Coffee' },
    { value: 'formal', label: 'Деловое', icon: 'Sparkles' }
  ];

  const fashionTips = [
    {
      title: 'Многослойность в 2025',
      desc: 'Комбинируйте текстуры и длины для создания глубины образа',
      icon: 'Layers',
      fullText: 'Многослойность остается главным трендом 2025 года. Сочетайте разные текстуры: шелк с кашемиром, деним с кожей, трикотаж с шифоном. Играйте с длинами — длинный кардиган поверх короткого топа, или укороченная куртка с длинной юбкой. Это создает визуальную глубину и делает образ более динамичным.',
      tips: ['Начните с базовой футболки или рубашки', 'Добавьте джемпер или кардиган среднего слоя', 'Завершите образ пальто или жакетом', 'Используйте не более 3-4 слоев одновременно']
    },
    {
      title: 'Цветовая палитра',
      desc: 'Монохром с яркими акцентами — тренд сезона',
      icon: 'Palette',
      fullText: 'В 2025 актуален монохромный подход к цветам с неожиданными яркими акцентами. Базовая палитра строится на нейтральных оттенках — бежевом, сером, белом, черном. Акцентные цвета: электрик-синий, фуксия, лаймовый зеленый. Используйте яркий цвет точечно — сумка, обувь или украшение.',
      tips: ['Базовый гардероб: 70% нейтральных цветов', '20% пастельных оттенков', '10% ярких акцентов', 'Правило трех цветов в одном образе']
    },
    {
      title: 'Устойчивая мода',
      desc: 'Качество важнее количества — инвестируйте в базовые вещи',
      icon: 'Leaf',
      fullText: 'Осознанное потребление — это не просто тренд, а философия моды будущего. Инвестируйте в качественные базовые вещи, которые прослужат годами. Обращайте внимание на состав ткани, качество пошива и универсальность вещи. Одна качественная белая рубашка лучше пяти дешевых.',
      tips: ['Выбирайте натуральные ткани: хлопок, лен, шерсть', 'Проверяйте качество швов и фурнитуры', 'Создавайте капсульный гардероб из 30-40 вещей', 'Ухаживайте за одеждой правильно']
    },
    {
      title: 'Аксессуары 2025',
      desc: 'Объемные украшения и минималистичные сумки',
      icon: 'Watch',
      fullText: 'Аксессуары 2025 — это контрасты. С одной стороны — крупные, объемные украшения: массивные цепи, большие серьги-кольца, многослойные браслеты. С другой — минималистичные компактные сумки строгих геометрических форм. Главное правило: если украшения крупные, то сумка — лаконичная, и наоборот.',
      tips: ['Крупные серьги + простой наряд = баланс', 'Мини-сумка на цепочке — must-have сезона', 'Часы оверсайз вместо браслетов', 'Один акцентный аксессуар на образ']
    }
  ];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    const mockTemp = Math.floor(Math.random() * 30) - 10;
    const conditions = ['Солнечно', 'Облачно', 'Дождь', 'Снег'];
    setWeatherData({
      temp: mockTemp,
      condition: conditions[Math.floor(Math.random() * conditions.length)]
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newImages]);
      toast({
        title: 'Фото загружены',
        description: `Добавлено ${files.length} фото гардероба`
      });
    }
  };

  const generateOutfit = () => {
    if (!selectedCity || !eventType) {
      toast({
        title: 'Заполните данные',
        description: 'Выберите город и тип мероприятия',
        variant: 'destructive'
      });
      return;
    }

    setShowOutfit(true);
    toast({
      title: '✨ Образ готов!',
      description: 'AI подобрал идеальный look для вашего события'
    });
  };

  const toggleFavoriteTip = (idx: number) => {
    if (favoriteTips.includes(idx)) {
      setFavoriteTips(favoriteTips.filter(i => i !== idx));
      toast({
        title: 'Удалено из избранного',
        description: 'Совет убран из сохраненных'
      });
    } else {
      setFavoriteTips([...favoriteTips, idx]);
      toast({
        title: '⭐ Добавлено в избранное',
        description: 'Совет сохранен в вашей коллекции'
      });
    }
  };

  const handleStyleAnalysis = () => {
    if (uploadedImages.length === 0) {
      toast({
        title: 'Загрузите фото',
        description: 'Добавьте фотографии вашей одежды для анализа',
        variant: 'destructive'
      });
      return;
    }
    setShowStyleAnalysis(true);
    toast({
      title: '🎨 Анализ завершен!',
      description: 'Определили ваш стиль: Современный минимализм'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-purple-400 to-pink-400 shadow-lg shadow-purple-500/50"></div>
      <div className="absolute top-20 right-0 w-1 h-64 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute bottom-40 left-0 w-1 h-48 bg-gradient-to-b from-transparent via-purple-400/40 to-transparent"></div>
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-400 blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-primary to-purple-600 p-4 rounded-2xl">
                <Icon name="Sparkles" size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              ВкусОбраза
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Ваш персональный AI-стилист. Подбираем образы с учетом погоды, события и вашего гардероба
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span>10K+ образов в базе</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Актуальные тренды 2025</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>AI-рекомендации</span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 animate-scale-in hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="MapPin" className="text-primary" />
                Параметры подбора
              </CardTitle>
              <CardDescription>Расскажите о планах, и мы создадим идеальный образ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Город</Label>
                  <Select value={selectedCity} onValueChange={handleCitySelect}>
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event">Тип мероприятия</Label>
                  <Select value={eventType} onValueChange={setEventType}>
                    <SelectTrigger id="event">
                      <SelectValue placeholder="Куда идём?" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map(event => (
                        <SelectItem key={event.value} value={event.value}>
                          <div className="flex items-center gap-2">
                            <Icon name={event.icon as any} size={16} />
                            {event.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {weatherData && (
                <div className="p-4 bg-secondary/50 rounded-lg flex items-center gap-4 animate-fade-in">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon name="Cloud" size={32} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{weatherData.temp}°C</p>
                    <p className="text-sm text-muted-foreground">{weatherData.condition} в {selectedCity}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="wardrobe">Загрузите фото гардероба</Label>
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/60 transition-colors">
                  <Input
                    id="wardrobe"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="wardrobe" className="cursor-pointer">
                    <Icon name="Upload" size={48} className="mx-auto mb-4 text-primary" />
                    <p className="text-sm font-medium mb-1">Нажмите для загрузки</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG до 10MB</p>
                  </label>
                </div>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2 animate-fade-in">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden">
                      <img src={img} alt={`Одежда ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <Button onClick={generateOutfit} className="w-full h-12 text-base" size="lg">
                <Icon name="Sparkles" className="mr-2" />
                Создать образ
              </Button>

              {showOutfit && (
                <div className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-purple-100 rounded-lg border-2 border-primary/20 animate-fade-in">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Icon name="CheckCircle" className="text-primary" />
                    Ваш идеальный образ
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="Shirt" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-semibold">Верх:</p>
                        <p className="text-sm text-muted-foreground">Белая блузка из шелка + бежевый кардиган оверсайз</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Package" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-semibold">Низ:</p>
                        <p className="text-sm text-muted-foreground">Темно-синие джинсы прямого кроя</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Footprints" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-semibold">Обувь:</p>
                        <p className="text-sm text-muted-foreground">Белые кроссовки или бежевые лоферы</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Watch" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-semibold">Аксессуары:</p>
                        <p className="text-sm text-muted-foreground">Минималистичные серьги-кольца, небольшая кожаная сумка</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white/60 rounded-lg">
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Icon name="Thermometer" size={16} />
                      С учетом температуры {weatherData?.temp}°C — комфортно и стильно!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="animate-scale-in hover:shadow-xl transition-shadow" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Lightbulb" className="text-primary" />
                  Fashion-советы 2025
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fashionTips.map((tip, idx) => (
                  <div key={idx}>
                    <div className="flex items-start gap-2">
                      <div 
                        className="flex-1 flex gap-3 group cursor-pointer p-2 rounded-lg hover:bg-purple-100/50 transition-colors"
                        onClick={() => setSelectedTip(selectedTip === idx ? null : idx)}
                      >
                        <div className="p-2 bg-purple-100 rounded-lg h-fit group-hover:bg-primary/10 transition-colors">
                          <Icon name={tip.icon as any} size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                        </div>
                        <Icon 
                          name={selectedTip === idx ? "ChevronUp" : "ChevronDown"} 
                          size={20} 
                          className="text-muted-foreground transition-transform"
                        />
                      </div>
                      <Button
                        size="sm"
                        variant={favoriteTips.includes(idx) ? "default" : "outline"}
                        className={`p-2 h-auto ${favoriteTips.includes(idx) ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-purple-100'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavoriteTip(idx);
                        }}
                      >
                        <Icon 
                          name={favoriteTips.includes(idx) ? "Star" : "StarOff"} 
                          size={16} 
                          className={favoriteTips.includes(idx) ? "fill-current" : ""}
                        />
                      </Button>
                    </div>
                    {selectedTip === idx && (
                      <div className="mt-3 p-4 bg-primary/5 rounded-lg border border-primary/10 animate-fade-in">
                        <p className="text-sm text-foreground mb-3 leading-relaxed">{tip.fullText}</p>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-primary">Практические советы:</p>
                          <ul className="space-y-1">
                            {tip.tips.map((tipItem, tipIdx) => (
                              <li key={tipIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                                <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                                <span>{tipItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary to-purple-600 text-white animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Icon name="Zap" size={24} />
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">Новинка</Badge>
                    <h3 className="font-bold text-lg">AI-анализ стиля</h3>
                  </div>
                </div>
                <p className="text-sm text-white/90 mb-4">
                  Загрузите фото, и наш AI определит ваш стиль и цветотип
                </p>
                <Button variant="secondary" className="w-full" onClick={handleStyleAnalysis}>
                  Попробовать
                </Button>
              </CardContent>
            </Card>

            {showStyleAnalysis && (
              <Card className="animate-scale-in border-2 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="Palette" className="text-primary" />
                    Результаты анализа
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold mb-2">Ваш стиль:</p>
                    <Badge className="bg-primary text-white">Современный минимализм</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Цветотип:</p>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-primary"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                      <div className="w-8 h-8 rounded-full bg-white border"></div>
                      <div className="w-8 h-8 rounded-full bg-amber-100"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Холодное лето</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">Рекомендации:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Базовые цвета: серый, синий, белый</li>
                      <li>• Акценты: пыльная роза, лаванда</li>
                      <li>• Избегайте: яркий оранжевый, теплый желтый</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="relative mb-12">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8"></div>
        </div>

        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Как это работает?</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            ВкусОбраза анализирует погоду в вашем городе, учитывает тип предстоящего мероприятия и изучает ваш гардероб, 
            чтобы создать идеальный образ. Наша нейросеть обучена на тысячах стильных сочетаний от ведущих fashion-блогеров 
            и стилистов со всего мира. Просто загрузите фото вашей одежды, выберите событие — и получите персональные рекомендации!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full"></div>
        </section>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: 'Sparkles', title: 'AI-подбор', desc: 'Умные рекомендации на основе 10K+ образов' },
            { icon: 'CloudSun', title: 'Погода', desc: 'Актуальные данные для вашего города' },
            { icon: 'Camera', title: 'Гардероб', desc: 'Анализ ваших вещей и сочетаний' }
          ].map((feature, idx) => (
            <Card key={idx} className="text-center hover:shadow-xl hover:shadow-purple-200/50 transition-all hover:-translate-y-1 animate-fade-in border-purple-100" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardContent className="pt-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-4">
                  <Icon name={feature.icon as any} size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Галерея образов</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Вдохновляйтесь готовыми луками для разных случаев. Каждый образ подобран с учетом актуальных трендов 2025
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                image: 'https://cdn.poehali.dev/projects/0dc819b1-7435-4b92-ad20-5882f6660e2f/files/c7f54df4-85f2-44d4-9c41-9b7d1293c6da.jpg',
                title: 'Офисный шик',
                desc: 'Элегантный образ для деловых встреч',
                temp: '+15°C',
                season: 'Весна/Осень',
                tags: ['Офис', 'Деловое'],
                icon: 'Briefcase',
                details: {
                  верх: 'Белая шелковая блузка с V-вырезом',
                  низ: 'Бежевые брюки прямого кроя',
                  обувь: 'Бежевые лоферы на низком каблуке',
                  аксессуары: 'Кожаная сумка-тоут, минималистичные часы'
                }
              },
              {
                image: 'https://cdn.poehali.dev/projects/0dc819b1-7435-4b92-ad20-5882f6660e2f/files/940c68ad-0bcf-4c47-a475-25a37b40fab2.jpg',
                title: 'Вечерний выход',
                desc: 'Роскошный look для особых событий',
                temp: '+20°C',
                season: 'Лето',
                tags: ['Вечеринка', 'Свидание'],
                icon: 'PartyPopper',
                details: {
                  верх: 'Черное коктейльное платье миди',
                  низ: 'Встроено в платье',
                  обувь: 'Черные туфли-лодочки на шпильке',
                  аксессуары: 'Клатч с пайетками, серьги-люстры, красная помада'
                }
              },
              {
                image: 'https://cdn.poehali.dev/projects/0dc819b1-7435-4b92-ad20-5882f6660e2f/files/112d241f-f7cf-418f-8a3b-f17d926e410d.jpg',
                title: 'Casual прогулка',
                desc: 'Комфортный стиль на каждый день',
                temp: '+10°C',
                season: 'Круглый год',
                tags: ['Прогулка', 'Спорт'],
                icon: 'Coffee',
                details: {
                  верх: 'Серый худи оверсайз',
                  низ: 'Темно-синие джинсы-бойфренды',
                  обувь: 'Белые кроссовки',
                  аксессуары: 'Рюкзак, солнцезащитные очки, кепка'
                }
              },
              ...(showMoreOutfits ? [
                {
                  image: 'https://cdn.poehali.dev/projects/0dc819b1-7435-4b92-ad20-5882f6660e2f/files/f5f74894-0e8e-4403-8f6a-a735594b6038.jpg',
                  title: 'Бизнес-встреча',
                  desc: 'Строгий деловой стиль',
                  temp: '+18°C',
                  season: 'Весна',
                  tags: ['Офис', 'Деловое'],
                  icon: 'Building',
                  details: {
                    верх: 'Темно-синий пиджак и белая рубашка',
                    низ: 'Серые брюки со стрелками',
                    обувь: 'Черные оксфорды',
                    аксессуары: 'Кожаный портфель, галстук, часы'
                  }
                },
                {
                  image: 'https://cdn.poehali.dev/projects/0dc819b1-7435-4b92-ad20-5882f6660e2f/files/3206263a-17bc-49e7-a3cc-c72f4c3abc8a.jpg',
                  title: 'Спорт-активность',
                  desc: 'Функциональный фитнес-образ',
                  temp: '+12°C',
                  season: 'Весна/Осень',
                  tags: ['Спорт', 'Активный отдых'],
                  icon: 'Activity',
                  details: {
                    верх: 'Спортивный топ и ветровка',
                    низ: 'Леггинсы с высокой посадкой',
                    обувь: 'Беговые кроссовки',
                    аксессуары: 'Фитнес-браслет, бутылка для воды, наушники'
                  }
                },
                {
                  image: 'https://cdn.poehali.dev/projects/0dc819b1-7435-4b92-ad20-5882f6660e2f/files/4ecca14b-3d4e-4c8a-a8b0-e7811c4a4945.jpg',
                  title: 'Романтическое свидание',
                  desc: 'Нежный женственный образ',
                  temp: '+22°C',
                  season: 'Лето',
                  tags: ['Свидание', 'Вечер'],
                  icon: 'HeartHandshake',
                  details: {
                    верх: 'Нежно-розовое платье с кружевом',
                    низ: 'Встроено в платье',
                    обувь: 'Бежевые босоножки на каблуке',
                    аксессуары: 'Маленькая сумочка, деликатные украшения, духи'
                  }
                }
              ] : [])
            ].map((outfit, idx) => (
              <Card key={idx} className="overflow-hidden group hover:shadow-2xl hover:shadow-purple-300/50 transition-all duration-300 hover:-translate-y-2 animate-fade-in border-purple-100" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={outfit.image} 
                    alt={outfit.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
                    <Icon name="Thermometer" size={14} className="text-primary" />
                    {outfit.temp}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={outfit.icon as any} size={20} className="text-primary" />
                    <h3 className="font-bold text-lg">{outfit.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{outfit.desc}</p>
                  <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{outfit.season}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {outfit.tags.map((tag, tagIdx) => (
                      <Badge key={tagIdx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white border-0" 
                    size="sm"
                    onClick={() => setSelectedOutfit(selectedOutfit === idx ? null : idx)}
                  >
                    <Icon name="Eye" size={16} className="mr-2" />
                    {selectedOutfit === idx ? 'Скрыть детали' : 'Посмотреть детали'}
                  </Button>
                  
                  {selectedOutfit === idx && (
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200 animate-fade-in">
                      <h4 className="font-bold text-sm mb-3 text-purple-900">Детали образа:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Icon name="Shirt" size={16} className="text-purple-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-purple-900">Верх:</p>
                            <p className="text-xs text-muted-foreground">{outfit.details.верх}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="Package" size={16} className="text-purple-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-purple-900">Низ:</p>
                            <p className="text-xs text-muted-foreground">{outfit.details.низ}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="Footprints" size={16} className="text-purple-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-purple-900">Обувь:</p>
                            <p className="text-xs text-muted-foreground">{outfit.details.обувь}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="Watch" size={16} className="text-purple-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-purple-900">Аксессуары:</p>
                            <p className="text-xs text-muted-foreground">{outfit.details.аксессуары}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white border-0 shadow-lg shadow-purple-500/50"
              onClick={() => setShowMoreOutfits(!showMoreOutfits)}
            >
              {showMoreOutfits ? 'Скрыть образы' : 'Показать больше образов'}
              <Icon name={showMoreOutfits ? "ChevronUp" : "ChevronDown"} size={20} />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;