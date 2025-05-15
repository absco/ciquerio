import { useRoute } from "wouter";
import { useEffect, useState } from "react";
import { blogPosts } from "@/components/BlogSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function BlogPost() {
    var _a = useRoute("/blog/:id"), params = _a[1];
    var _b = useState(null), blogPost = _b[0], setBlogPost = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    useEffect(function () {
        if (params && params.id) {
            var post = blogPosts.find(function (post) { return post.id === parseInt(params.id); });
            if (post) {
                setBlogPost(post);
            }
            setLoading(false);
        }
    }, [params]);
    useEffect(function () {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);
    if (loading) {
        return (<div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>);
    }
    if (!blogPost) {
        return (<div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center px-4 py-16">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-neutral-500 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="#blog">
              <ArrowLeft className="mr-2 h-4 w-4"/>
              Back to Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </div>);
    }
    return (<div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/#blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4"/>
                Back to All Articles
              </Button>
            </Link>

            <div className="mb-8">
              <img src={blogPost.image} alt={blogPost.imageAlt} className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow-md mb-6"/>

              <div className="flex items-center text-sm text-neutral-500 mb-4">
                <Calendar className="h-4 w-4 mr-2"/>
                <span>{blogPost.date}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6">{blogPost.title}</h1>
            </div>

            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }}/>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Ready to learn more?</h3>
              <p className="text-neutral-500 mb-6">
                Contact our experts today to discuss how we can help your organization address these challenges.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                <Link href="/#contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>);
}
