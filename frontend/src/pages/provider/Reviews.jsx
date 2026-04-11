import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare, User, Calendar } from 'lucide-react';
import { api } from '@/utils/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await api.get('/reviews/' + user._id);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Fallback mock data
        setReviews([
          {
            _id: 'rev_1',
            userName: 'Alice Smith',
            rating: 5,
            comment: 'Absolutely amazing work! The logo exceeded my expectations and was delivered ahead of schedule.',
            createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
            serviceTitle: 'Professional Logo Design'
          },
          {
            _id: 'rev_2',
            userName: 'David Miller',
            rating: 4,
            comment: 'Great communication and technical skills. Highly recommended for React projects.',
            createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
            serviceTitle: 'React Website Development'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
      />
    ));
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Client Reviews</h1>
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          <Star className="w-4 h-4 fill-primary" />
          <span>4.9 Average Rating</span>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-lg font-medium">No reviews yet</h3>
            <p className="text-muted-foreground">Reviews from your clients will appear here.</p>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review._id} className="border-slate-200/60 dark:border-slate-800/60 group">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold">
                          {review.userName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{review.userName}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground italic">
                      <span>Service:</span>
                      <span className="text-primary">{review.serviceTitle}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
