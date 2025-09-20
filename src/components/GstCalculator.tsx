import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

const GstCalculator = () => {
  const [oldMrp, setOldMrp] = useState<string>("");
  const [oldGst, setOldGst] = useState<string>("12");
  const [newGst, setNewGst] = useState<string>("5");
  
  const [priceWithoutGst, setPriceWithoutGst] = useState<number>(0);
  const [newMrp, setNewMrp] = useState<number>(0);

  useEffect(() => {
    if (oldMrp && oldGst) {
      const oldMrpNum = parseFloat(oldMrp);
      const oldGstNum = parseFloat(oldGst);
      const newGstNum = parseFloat(newGst);

      if (!isNaN(oldMrpNum) && !isNaN(oldGstNum) && !isNaN(newGstNum)) {
        // Calculate Price without GST = 100 * (OLD MRP) / (100 + Old GST)
        const priceWithoutGstCalculated = (100 * oldMrpNum) / (100 + oldGstNum);
        
        // Calculate New MRP = Price without GST * (1 + New GST/100)
        const newMrpCalculated = priceWithoutGstCalculated * (1 + newGstNum / 100);
        
        setPriceWithoutGst(priceWithoutGstCalculated);
        setNewMrp(newMrpCalculated);
      } else {
        setPriceWithoutGst(0);
        setNewMrp(0);
      }
    } else {
      setPriceWithoutGst(0);
      setNewMrp(0);
    }
  }, [oldMrp, oldGst, newGst]);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 shadow-elegant">
            <Calculator className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Cycle World Sonipat
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate new Maximum Retail Price (MRP) when GST rates change. 
            Enter your current MRP and GST details to get the updated pricing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Card */}
          <Card className="shadow-card border-0">
            <CardHeader className="bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-t-lg">
              <CardTitle className="text-secondary-foreground flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Input Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="old-mrp" className="text-sm font-medium text-foreground">
                  Current MRP (₹)
                </Label>
                <Input
                  id="old-mrp"
                  type="number"
                  placeholder="Enter current MRP"
                  value={oldMrp}
                  onChange={(e) => setOldMrp(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="old-gst" className="text-sm font-medium text-foreground">
                  Current GST Rate (%)
                </Label>
                <Input
                  id="old-gst"
                  type="number"
                  placeholder="12"
                  value={oldGst}
                  onChange={(e) => setOldGst(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-gst" className="text-sm font-medium text-foreground">
                  New GST Rate (%)
                </Label>
                <Input
                  id="new-gst"
                  type="number"
                  placeholder="5"
                  value={newGst}
                  onChange={(e) => setNewGst(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-card border-0">
            <CardHeader className="bg-gradient-primary rounded-t-lg">
              <CardTitle className="text-primary-foreground">
                Calculated Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="bg-secondary/20 rounded-lg p-4 border border-secondary/30">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Price without GST
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    ₹{priceWithoutGst.toFixed(2)}
                  </div>
                </div>
                
                <div className="bg-gradient-accent rounded-lg p-6 shadow-elegant">
                  <div className="text-sm font-medium text-accent-foreground/80 mb-2">
                    New MRP (After GST Change)
                  </div>
                  <div className="text-3xl font-bold text-accent-foreground">
                    ₹{newMrp.toFixed(2)}
                  </div>
                </div>
                
                {oldMrp && newMrp > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Price Difference
                    </div>
                    <div className={`text-xl font-semibold ${
                      newMrp > parseFloat(oldMrp) ? 'text-destructive' : 'text-accent'
                    }`}>
                      {newMrp > parseFloat(oldMrp) ? '+' : ''}
                      ₹{(newMrp - parseFloat(oldMrp)).toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formula Section */}
        <Card className="mt-12 shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-foreground">Calculation Formula</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Step 1: Calculate Price without GST</h4>
                <p className="text-muted-foreground font-mono">
                  Price without GST = 100 × (Old MRP) ÷ (100 + Old GST%)
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Step 2: Calculate New MRP</h4>
                <p className="text-muted-foreground font-mono">
                  New MRP = Price without GST × (1 + New GST% ÷ 100)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GstCalculator;