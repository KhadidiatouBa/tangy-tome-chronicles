import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Save, 
  Eye, 
  Send, 
  Image, 
  Bold, 
  Italic, 
  List, 
  Link,
  ArrowLeft,
  Clock,
  Globe,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const ArticleEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [article, setArticle] = useState({
    title: "",
    content: "",
    excerpt: "",
    tags: "",
    visibility: "public",
    allowComments: true,
    scheduledDate: "",
    category: ""
  });
  
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (isDraft = true) => {
    setIsSaving(true);
    
    // Simulation de la sauvegarde
    setTimeout(() => {
      toast({
        title: isDraft ? "Brouillon sauvegardé" : "Article publié",
        description: isDraft 
          ? "Votre article a été sauvegardé en tant que brouillon."
          : "Votre article a été publié avec succès !",
      });
      setIsSaving(false);
      
      if (!isDraft) {
        navigate("/articles");
      }
    }, 1000);
  };

  const handlePublish = () => {
    if (!article.title.trim() || !article.content.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir au moins le titre et le contenu.",
        variant: "destructive",
      });
      return;
    }
    handleSave(false);
  };

  const formatText = (format: string) => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = article.content.substring(start, end);
    let formattedText = "";

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = 
      article.content.substring(0, start) + 
      formattedText + 
      article.content.substring(end);
    
    setArticle(prev => ({ ...prev, content: newContent }));
  };

  const tagList = article.tags.split(',').filter(tag => tag.trim()).map(tag => tag.trim());

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/articles")}
              className="hover:bg-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Éditeur d'article</h1>
              <p className="text-muted-foreground">Créez et partagez votre contenu</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
              className="border-border"
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreview ? "Éditer" : "Aperçu"}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="border-border"
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
            
            <Button
              onClick={handlePublish}
              disabled={isSaving}
              className="bg-gradient-primary hover:opacity-90 shadow-medium"
            >
              <Send className="w-4 h-4 mr-2" />
              Publier
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Card className="shadow-soft border-border">
              <CardContent className="p-6">
                {!isPreview ? (
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <Label htmlFor="title" className="text-foreground font-medium mb-2 block">
                        Titre de l'article
                      </Label>
                      <Input
                        id="title"
                        value={article.title}
                        onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Donnez un titre accrocheur à votre article..."
                        className="text-2xl font-bold border-none p-0 focus:ring-0 bg-transparent"
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <Label htmlFor="excerpt" className="text-foreground font-medium mb-2 block">
                        Résumé (optionnel)
                      </Label>
                      <Textarea
                        id="excerpt"
                        value={article.excerpt}
                        onChange={(e) => setArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Résumé de votre article..."
                        className="min-h-[80px] bg-background border-border"
                      />
                    </div>

                    {/* Content Editor */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label htmlFor="content" className="text-foreground font-medium">
                          Contenu
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => formatText('bold')}
                            className="hover:bg-secondary"
                          >
                            <Bold className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => formatText('italic')}
                            className="hover:bg-secondary"
                          >
                            <Italic className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => formatText('list')}
                            className="hover:bg-secondary"
                          >
                            <List className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="hover:bg-secondary"
                          >
                            <Link className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="hover:bg-secondary"
                          >
                            <Image className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <Textarea
                        id="content"
                        name="content"
                        value={article.content}
                        onChange={(e) => setArticle(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Commencez à écrire votre article..."
                        className="min-h-[400px] bg-background border-border font-mono text-sm"
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <Label htmlFor="tags" className="text-foreground font-medium mb-2 block">
                        Tags (séparés par des virgules)
                      </Label>
                      <Input
                        id="tags"
                        value={article.tags}
                        onChange={(e) => setArticle(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="tech, programming, tutorial"
                        className="bg-background border-border"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tagList.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Preview Mode */
                  <div className="prose prose-lg max-w-none">
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                      {article.title || "Titre de votre article"}
                    </h1>
                    
                    {article.excerpt && (
                      <div className="bg-secondary p-4 rounded-lg mb-6">
                        <p className="text-muted-foreground italic">
                          {article.excerpt}
                        </p>
                      </div>
                    )}
                    
                    <div className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {article.content || "Le contenu de votre article apparaîtra ici..."}
                    </div>
                    
                    {tagList.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
                        {tagList.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            {/* Publication Settings */}
            <Card className="shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Paramètres de publication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Visibility */}
                <div>
                  <Label className="text-foreground font-medium mb-2 block">
                    Visibilité
                  </Label>
                  <Select
                    value={article.visibility}
                    onValueChange={(value) => setArticle(prev => ({ ...prev, visibility: value }))}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4" />
                          <span>Public</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center space-x-2">
                          <Lock className="w-4 h-4" />
                          <span>Privé</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Comments */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="comments" className="text-foreground font-medium">
                    Autoriser les commentaires
                  </Label>
                  <Switch
                    id="comments"
                    checked={article.allowComments}
                    onCheckedChange={(checked) => setArticle(prev => ({ ...prev, allowComments: checked }))}
                  />
                </div>

                {/* Category */}
                <div>
                  <Label className="text-foreground font-medium mb-2 block">
                    Catégorie
                  </Label>
                  <Select
                    value={article.category}
                    onValueChange={(value) => setArticle(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technologie</SelectItem>
                      <SelectItem value="lifestyle">Style de vie</SelectItem>
                      <SelectItem value="travel">Voyage</SelectItem>
                      <SelectItem value="food">Cuisine</SelectItem>
                      <SelectItem value="photography">Photographie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Scheduled Publication */}
                <div>
                  <Label htmlFor="scheduledDate" className="text-foreground font-medium mb-2 block">
                    Publication programmée
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="scheduledDate"
                      type="datetime-local"
                      value={article.scheduledDate}
                      onChange={(e) => setArticle(prev => ({ ...prev, scheduledDate: e.target.value }))}
                      className="pl-10 bg-background border-border"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article Stats */}
            <Card className="shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mots :</span>
                  <span className="font-medium text-foreground">
                    {article.content.split(/\s+/).filter(word => word.length > 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Caractères :</span>
                  <span className="font-medium text-foreground">
                    {article.content.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temps de lecture :</span>
                  <span className="font-medium text-foreground">
                    {Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200))} min
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticleEditor;