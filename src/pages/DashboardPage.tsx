import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Search, 
  MapPin, 
  Layers, 
  X, 
  Plus, 
  Inbox,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  ComplaintRecord, 
  CategoryId, 
  PriorityLevel, 
  ComplaintStatus, 
  ComplaintFilterOptions 
} from '../types/complaint';
import { ComplaintStore } from '../services/complaintStore';
import { PriorityBadge } from '../components/ui/PriorityBadge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { EmptyState } from '../components/ui/EmptyState';
import { getAssetUrl } from '../utils/assets';
import { updatePageSEO } from '../utils/seo';
import IsometricCity from '../components/IsometricCity';
import { useTranslation } from '../i18n/LanguageContext';

export interface DashboardPageProps {
  complaints: ComplaintRecord[];
  onAddNewComplaint: () => void;
  onSelectComplaint: (complaint: ComplaintRecord) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  complaints,
  onAddNewComplaint,
  onSelectComplaint,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    updatePageSEO({
      title: 'Complaints & Reports Dashboard',
      description: 'Live grievance registry tracking citizen-reported public facility issues, AI prioritization, and municipal engineering dispatch status.',
    });
  }, []);

  const [activeTab, setActiveTab] = useState<'table' | 'map'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<PriorityLevel | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ComplaintStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority' | 'affected'>('newest');
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedPriority, selectedStatus, sortBy]);

  const filteredComplaints = useMemo(() => {
    const options: ComplaintFilterOptions = {
      searchQuery: searchTerm,
      category: selectedCategory,
      priority: selectedPriority,
      status: selectedStatus,
      sortBy,
    };
    return ComplaintStore.filterComplaints(complaints, options);
  }, [complaints, searchTerm, selectedCategory, selectedPriority, selectedStatus, sortBy]);

  const totalPages = Math.ceil(filteredComplaints.length / pageSize) || 1;
  const paginatedComplaints = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredComplaints.slice(start, start + pageSize);
  }, [filteredComplaints, currentPage, pageSize]);

  const totalCount = complaints.length;
  const criticalCount = complaints.filter((c) => c.priority === 'Critical' || c.priority === 'High').length;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPriority('all');
    setSelectedStatus('all');
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'all' || selectedPriority !== 'all' || selectedStatus !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & Main CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs text-blue-700 font-semibold mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>{t('badge_smart_city', 'Civic Grievance Redressal Registry')}</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            {t('dash_title', 'Complaints & Reports Dashboard')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('dash_desc', 'Monitor real-time infrastructure intake, AI priority classification, and field dispatch operations.')}
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={onAddNewComplaint}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          {t('nav_cta_file', 'Submit New Complaint')}
        </Button>
      </div>

      {/* KPI Metric Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="card-3d p-5 rounded-2xl bg-white border border-[#E8E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#525252] text-xs">
            <span>{t('dash_kpi_total', 'Total Registered')}</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2D2D2D]">
            {totalCount}
          </p>
          <span className="text-[11px] text-[#737373] block font-medium">
            Across {new Set(complaints.map(c => c.district)).size} Municipal Districts
          </span>
        </div>

        <div className="card-3d p-5 rounded-2xl bg-white border border-[#E8E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#525252] text-xs">
            <span>{t('dash_kpi_urgent', 'Urgent (High / Critical)')}</span>
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shadow-2xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading font-extrabold text-2xl sm:text-3xl text-red-600">
            {criticalCount}
          </p>
          <span className="text-[11px] text-red-600/90 block font-medium">
            Requires 4–24 Hour Resolution
          </span>
        </div>

        <div className="card-3d p-5 rounded-2xl bg-white border border-[#E8E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#525252] text-xs">
            <span>{t('dash_kpi_mobilized', 'Squads Mobilized')}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-2xs">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-600">
            {inProgressCount}
          </p>
          <span className="text-[11px] text-amber-700 block font-medium">
            Field Crews On-Site
          </span>
        </div>

        <div className="card-3d p-5 rounded-2xl bg-white border border-[#E8E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#525252] text-xs">
            <span>{t('dash_kpi_resolved', 'Resolved Grievances')}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-2xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-600">
            {resolvedCount}
          </p>
          <span className="text-[11px] text-emerald-700 block font-medium">
            Verified &amp; Sealed
          </span>
        </div>

      </div>

      {/* Tab Switcher (Registry vs 3D Map) */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('table')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'table'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-[#525252] hover:text-[#2D2D2D] hover:bg-neutral-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{t('dash_tab_registry', 'Complaints Registry')} ({filteredComplaints.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('map')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'map'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-[#525252] hover:text-[#2D2D2D] hover:bg-neutral-100'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{t('dash_tab_map', 'Interactive 3D City Map')}</span>
        </button>
      </div>

      {activeTab === 'map' ? (
        /* Interactive 3D City Map View */
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E8E0D8] text-xs text-[#525252] flex items-center justify-between shadow-xs">
            <span>Interactive Municipal Grid — Click on pins to inspect incident hotspots.</span>
            <span className="text-teal-700 font-mono font-bold">Live Ward Sensors Active</span>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl p-4 sm:p-6">
            <IsometricCity
              onSelectPin={(pin: any) => {
                const matched = complaints.find((c) => c.categoryId === pin.type || c.category.toLowerCase().includes(pin.type));
                if (matched) {
                  onSelectComplaint(matched);
                } else if (complaints[0]) {
                  onSelectComplaint(complaints[0]);
                }
              }}
            />
          </div>
        </div>
      ) : (
        /* Registry Filter Toolbar + Table / Card View */
        <div className="space-y-6">
          
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              
              {/* Search input */}
              <div className="md:col-span-4">
                <Input
                  id="dashboard-search"
                  placeholder={t('dash_search_placeholder', 'Search ID, landmark, keywords...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                  rightIcon={
                    searchTerm ? (
                      <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="text-slate-400 hover:text-slate-700"
                        aria-label="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    ) : null
                  }
                />
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3">
                <Select
                  id="filter-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                >
                  <option value="all">{t('dash_filter_all_cats', 'All Categories')}</option>
                  <option value="pothole">{t('cat_pothole', 'Pothole / Road Damage')}</option>
                  <option value="garbage">{t('cat_garbage', 'Garbage / Solid Waste')}</option>
                  <option value="streetlight">{t('cat_streetlight', 'Broken Streetlight')}</option>
                  <option value="water_leak">{t('cat_water_leak', 'Water Leakage')}</option>
                  <option value="drainage">{t('cat_drainage', 'Drainage / Sewage Block')}</option>
                  <option value="infrastructure">{t('cat_infrastructure', 'Public Infrastructure')}</option>
                  <option value="other">{t('cat_other', 'Other Issues')}</option>
                </Select>
              </div>

              {/* Priority Filter */}
              <div className="md:col-span-2">
                <Select
                  id="filter-priority"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value as any)}
                >
                  <option value="all">{t('dash_filter_all_priorities', 'All Priorities')}</option>
                  <option value="Critical">{t('priority_critical', 'Critical')}</option>
                  <option value="High">{t('priority_high', 'High')}</option>
                  <option value="Medium">{t('priority_medium', 'Medium')}</option>
                  <option value="Low">{t('priority_low', 'Low')}</option>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="md:col-span-2">
                <Select
                  id="filter-status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                >
                  <option value="all">{t('dash_filter_all_statuses', 'All Statuses')}</option>
                  <option value="Submitted">{t('status_submitted', 'Submitted')}</option>
                  <option value="AI Processing">{t('status_ai_processing', 'AI Processing')}</option>
                  <option value="Classified">{t('status_classified', 'Classified')}</option>
                  <option value="Assigned">{t('status_assigned', 'Assigned')}</option>
                  <option value="In Progress">{t('status_in_progress', 'In Progress')}</option>
                  <option value="Resolved">{t('status_resolved', 'Resolved')}</option>
                </Select>
              </div>

              {/* Sort By */}
              <div className="md:col-span-1">
                <Select
                  id="filter-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  title="Sort order"
                >
                  <option value="newest">Newest</option>
                  <option value="priority">Priority</option>
                  <option value="affected">Impact</option>
                  <option value="oldest">Oldest</option>
                </Select>
              </div>

            </div>

            {/* Active filter pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-500">Filtered results: <strong>{filteredComplaints.length}</strong></span>
                  {selectedCategory !== 'all' && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      Category: {selectedCategory}
                    </span>
                  )}
                  {selectedPriority !== 'all' && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      Priority: {selectedPriority}
                    </span>
                  )}
                  {selectedStatus !== 'all' && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      Status: {selectedStatus}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* If empty */}
          {filteredComplaints.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No Complaints Found"
              description="No grievances match your selected search terms or filters. Try adjusting your criteria or submit a new report."
              actionLabel="Clear Filter Criteria"
              onAction={handleClearFilters}
            />
          ) : (
            <>
              {/* DESKTOP TABLE VIEW */}
              <div className="hidden md:block rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs" aria-label="Complaints registry table">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                        <th scope="col" className="py-3 px-4">Record ID</th>
                        <th scope="col" className="py-3 px-4">Category</th>
                        <th scope="col" className="py-3 px-4">Priority (AI)</th>
                        <th scope="col" className="py-3 px-4">Location &amp; Ward</th>
                        <th scope="col" className="py-3 px-4">Impact</th>
                        <th scope="col" className="py-3 px-4">Status</th>
                        <th scope="col" className="py-3 px-4">Lodged</th>
                        <th scope="col" className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedComplaints.map((c) => (
                        <tr
                          key={c.id}
                          onClick={() => onSelectComplaint(c)}
                          className="hover:bg-teal-50/50 cursor-pointer transition-colors group"
                        >
                          {/* ID + Photo Indicator */}
                          <td className="py-3.5 px-4 font-mono font-bold text-teal-700">
                            <div className="flex items-center space-x-2">
                              {c.imageUrl && (
                                <img
                                  src={getAssetUrl(c.imageUrl)}
                                  alt=""
                                  className="w-7 h-7 rounded-md object-cover border border-[#E8E0D8]"
                                />
                              )}
                              <span>{c.id}</span>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-4 text-[#2D2D2D] font-semibold max-w-[180px] truncate">
                            {c.category}
                          </td>

                          {/* Priority */}
                          <td className="py-3.5 px-4">
                            <PriorityBadge priority={c.priority} size="sm" />
                          </td>

                          {/* Location */}
                          <td className="py-3.5 px-4 text-[#525252] max-w-[200px] truncate">
                            {c.location}
                          </td>

                          {/* Impact */}
                          <td className="py-3.5 px-4 font-mono text-[#525252]">
                            ~{c.affectedPeople.toLocaleString()}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            <StatusBadge status={c.status} size="sm" />
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-4 text-[#737373] whitespace-nowrap">
                            {new Date(c.createdAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>

                          {/* Action CTA */}
                          <td className="py-3.5 px-4 text-right">
                            <span className="text-teal-600 group-hover:text-teal-700 font-semibold inline-flex items-center gap-1">
                              <span>View Dossier</span>
                              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MOBILE CARDS LIST VIEW */}
              <div className="md:hidden space-y-3">
                {paginatedComplaints.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onSelectComplaint(c)}
                    className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs active:scale-[0.99] transition-transform cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {c.id}
                        </span>
                        {c.imageUrl && (
                          <span className="text-[10px] text-[#525252] flex items-center gap-0.5">
                            <ImageIcon className="w-3 h-3 text-teal-600" />
                            <span>Photo</span>
                          </span>
                        )}
                      </div>
                      <StatusBadge status={c.status} size="sm" />
                    </div>

                    <div className="flex items-start space-x-3">
                      {c.imageUrl && (
                        <img
                          src={getAssetUrl(c.imageUrl)}
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover border border-[#E8E0D8] flex-shrink-0"
                        />
                      )}
                      <div>
                        <h4 className="font-heading font-bold text-sm text-[#2D2D2D]">
                          {c.category}
                        </h4>
                        <p className="text-xs text-[#525252] line-clamp-2 mt-0.5">
                          {c.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E8E0D8] text-xs">
                      <PriorityBadge priority={c.priority} size="sm" />
                      <span className="text-[#525252] flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span className="truncate max-w-[140px]">{c.location}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 text-xs shadow-xs">
                  <div className="text-slate-500">
                    Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> to <strong>{Math.min(currentPage * pageSize, filteredComplaints.length)}</strong> of <strong>{filteredComplaints.length}</strong> complaints
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
                    >
                      Previous
                    </Button>

                    <span className="font-mono text-slate-700 px-2 font-bold">
                      {currentPage} / {totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      )}

    </div>
  );
};
