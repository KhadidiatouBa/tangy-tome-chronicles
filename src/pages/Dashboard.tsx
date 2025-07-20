import { useState } from "react";
import { 
  Plus, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  TrendingUp,
  Users,
  FileText,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";

const Dashboard = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const stats = [
    { title: "Articles publiés", value: "12", icon: FileText, color: "text-blue-600" },
    { title: "Vues totales", value: "2,847", icon: Eye, color: "text-green-600" },
    { title: "Amis", value: "43", icon: Users, color: "text-purple-600" },
    { title: "Engagement", value: "+15%", icon: TrendingUp, color: "text-primary" },
  ];

  const recentPosts = [
    {
      id: 1,
      author: "Marie Dubois",
      avatar: "/api/placeholder/40/40",
      title: "Les tendances du développement web en 2024",
      excerpt: "Découvrez les dernières technologies qui révolutionnent le développement web...",
      image: "/api/placeholder/600/300",
      likes: 24,
      comments: 8,
      timeAgo: "Il y a 2 heures",
      tags: ["Tech", "Web"]
    },
    {
      id: 2,
      author: "Thomas Martin",
      avatar: "/api/placeholder/40/40",
      title: "L'art de la photographie urbaine",
      excerpt: "Comment capturer l'essence de la ville à travers votre objectif...",
      image: "/api/placeholder/600/300",
      likes: 36,
      comments: 12,
      timeAgo: "Il y a 5 heures",
      tags: ["Photographie", "Art"]
    },
    {
      id: 3,
      author: "Sophie Leroy",
      avatar: "/api/placeholder/40/40",
      title: "Cuisine végétarienne : mes recettes favorites",
      excerpt: "Des plats savoureux et nutritifs pour une alimentation saine...",
      image: "/api/placeholder/600/300",
      likes: 18,
      comments: 5,
      timeAgo: "Il y a 1 jour",
      tags: ["Cuisine", "Santé"]
    }
  ];

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
            <p className="text-muted-foreground mt-1">
              Bienvenue sur votre plateforme de blog personnel
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-medium">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft border-border hover:shadow-medium transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Feed */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft border-border mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Fil d'actualité
                </CardTitle>
              </CardHeader>
            </Card>

            <div className="space-y-6">
              {recentPosts.map((post) => (
                <Card key={post.id} className="shadow-soft border-border hover:shadow-medium transition-all duration-200 animate-fade-in">
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={post.avatar} alt={post.author} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{post.author}</p>
                          <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary cursor-pointer transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Post Image */}
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 transition-colors ${
                            likedPosts.includes(post.id)
                              ? "text-red-500"
                              : "text-muted-foreground hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                          <span className="text-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm">Partager</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-primary hover:opacity-90">
                  <Plus className="w-4 h-4 mr-3" />
                  Écrire un article
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-3" />
                  Trouver des amis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-3" />
                  Mes brouillons
                </Button>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Sujets tendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["#TechTrends", "#Photography", "#Cooking", "#Travel", "#Lifestyle"].map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary cursor-pointer transition-colors">
                      <span className="text-primary font-medium">{topic}</span>
                      <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100) + 10} posts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-soft border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Activité récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-foreground">Nouvel ami ajouté</p>
                      <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-foreground">Article publié</p>
                      <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-foreground">5 nouveaux commentaires</p>
                      <p className="text-xs text-muted-foreground">Il y a 2 jours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;