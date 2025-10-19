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
      icon: 'Layers'
    },
    {
      title: 'Цветовая палитра',
      desc: 'Монохром с яркими акцентами — тренд сезона',
      icon: 'Palette'
    },
    {
      title: 'Устойчивая мода',
      desc: 'Качество важнее количества — инвестируйте в базовые вещи',
      icon: 'Leaf'
    },
    {
      title: 'Аксессуары 2025',
      desc: 'Объемные украшения и минималистичные сумки',
      icon: 'Watch'
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

    toast({
      title: '✨ Образ готов!',
      description: 'AI подобрал идеальный look для вашего события'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-purple-400 to-pink-400"></div>
      <div className="absolute top-20 right-0 w-1 h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-40 left-0 w-1 h-48 bg-gradient-to-b from-transparent via-purple-300/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
            StyleAI
          </h1>
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
                  <div key={idx} className="flex gap-3 group cursor-pointer">
                    <div className="p-2 bg-secondary rounded-lg h-fit group-hover:bg-primary/10 transition-colors">
                      <Icon name={tip.icon as any} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                    </div>
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
                <Button variant="secondary" className="w-full">
                  Попробовать
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="relative mb-12">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8"></div>
        </div>

        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Как это работает?</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            StyleAI анализирует погоду в вашем городе, учитывает тип предстоящего мероприятия и изучает ваш гардероб, 
            чтобы создать идеальный образ. Наша нейросеть обучена на тысячах стильных сочетаний от ведущих fashion-блогеров 
            и стилистов со всего мира. Просто загрузите фото вашей одежды, выберите событие — и получите персональные рекомендации!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full"></div>
        </section>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: 'Sparkles', title: 'AI-подбор', desc: 'Умные рекомендации на основе 10K+ образов' },
            { icon: 'CloudSun', title: 'Погода', desc: 'Актуальные данные для вашего города' },
            { icon: 'Camera', title: 'Гардероб', desc: 'Анализ ваших вещей и сочетаний' }
          ].map((feature, idx) => (
            <Card key={idx} className="text-center hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardContent className="pt-6">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon name={feature.icon as any} size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;