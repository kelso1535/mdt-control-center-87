
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RefreshCcw, File, AlertTriangle, FileText } from 'lucide-react';
import DashedDivider from '../DashedDivider';

type Report = {
  id: string;
  subject: string;
  type: 'Field' | 'Risk' | 'Incident' | 'Criminal';
  date: string;
  officer: string;
  summary: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
};

const mockReports: Report[] = [
  {
    id: 'R-2023-0451',
    subject: 'Braxton Jones',
    type: 'Risk',
    date: '2023-08-15',
    officer: 'Officer Davis',
    summary: 'Subject exhibited aggressive behavior during traffic stop. Approached officer with threatening posture. Consider backup when approaching.',
    severity: 'High'
  },
  {
    id: 'R-2023-0183',
    subject: 'Braxton Jones',
    type: 'Field',
    date: '2023-05-22',
    officer: 'Officer Wilson',
    summary: 'Subject found in possession of suspicious materials during routine stop. Items confiscated and logged as evidence.',
    severity: 'Medium'
  },
  {
    id: 'R-2023-0602',
    subject: 'Braxton Jones',
    type: 'Incident',
    date: '2023-11-04',
    officer: 'Officer Martinez',
    summary: 'Subject involved in altercation with law enforcement at local bar. Resisted arrest and had to be subdued with force.',
    severity: 'High'
  }
];

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getSeverityColor = (severity: Report['severity']) => {
    switch (severity) {
      case 'Low': return 'text-blue-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-orange-500';
      case 'Critical': return 'text-red-500';
      default: return 'text-blue-400';
    }
  };

  const getReportTypeIcon = (type: Report['type']) => {
    switch (type) {
      case 'Field': return <FileText className="w-4 h-4" />;
      case 'Risk': return <AlertTriangle className="w-4 h-4" />;
      case 'Incident': return <File className="w-4 h-4" />;
      case 'Criminal': return <AlertTriangle className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-blue-400 font-bold">Police Reports</h2>
        <Button 
          variant="outline" 
          className="bg-card border-primary/30 text-primary" 
          size="sm"
          onClick={loadData}
          disabled={loading}
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="ml-1">Refresh</span>
        </Button>
      </div>
      
      <div className="bg-card/30 border border-border rounded-md">
        <div className="bg-card/50 border-b border-border px-4 py-2">
          <h3 className="text-primary">Person Reports</h3>
          <p className="text-xs text-muted-foreground">Reports for currently selected person</p>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="loading-dots inline-flex">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : reports.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No reports found
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {reports.map((report) => (
              <div key={report.id} className="p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <span className="flex items-center text-primary mr-2">
                      {getReportTypeIcon(report.type)}
                    </span>
                    <span className="font-bold">{report.id}</span>
                    <span className="mx-2">|</span>
                    <span className={getSeverityColor(report.severity)}>
                      {report.severity} Severity
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {report.date} by {report.officer}
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className="text-muted-foreground mr-2">Subject:</span>
                  <span className="text-primary">{report.subject}</span>
                </div>
                
                <div className="bg-black/30 border border-border/30 p-3 rounded text-sm">
                  {report.summary}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
