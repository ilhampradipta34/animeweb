import { FaRegStar, FaStar } from "react-icons/fa";


const useRenderStars = () => {

      const renderStars = (score: number | undefined) => {
        if (score === undefined) return null;
    
        const maxStars = 5;
        const rating = (score / 10) * maxStars;
    
        const stars = [];
    
        for (let i = 0; i < maxStars; i++) {
          const fill = Math.min(1, Math.max(0, rating - i)); // 0.0 - 1.0
          const percentage = Math.round(fill * 100);
    
          stars.push(
            <span key={i} className="relative w-4 h-4 md:w-5 md:h-5 inline-block">
              <FaRegStar className="absolute text-[#475569] inset-0" />
              <span
                className="absolute overflow-hidden inset-0"
                style={{ width: `${percentage}%` }}
              >
                <FaStar className="text-[#facc15]" />
              </span>
            </span>
          );
        }
    
        return stars; // <- array langsung, bukan div
      };

    return {
      renderStars
    }
}

export default useRenderStars;