import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";

const ArticleList = () => {
  const articles = [
    { id: 1, title: "Introduction à React", status: "Publié", views: 245, comments: 12, date: "2024-01-15" },
    { id: 2, title: "Guide CSS Grid", status: "Brouillon", views: 0, comments: 0, date: "2024-01-10" },
    { id: 3, title: "JavaScript ES2024", status: "Publié", views: 189, comments: 8, date: "2024-01-05" }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mes Articles</h1>
          <Link to="/articles/new">
            <Button className="bg-gradient-primary hover:opacity-90 shadow-medium">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel article
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="shadow-soft border-border hover:shadow-medium transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{article.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <Badge variant={article.status === "Publié" ? "default" : "secondary"}>
                        {article.status}
                      </Badge>
                      <span>{article.views} vues</span>
                      <span>{article.comments} commentaires</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ArticleList;